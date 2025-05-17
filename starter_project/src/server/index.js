const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 8081;
const NLP_API_ENDPOINT = 'https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer';

// text extraction function
async function fetchWithPuppeteer(url) {
    console.log("Using Puppeteer (stealth mode) to fetch:", url);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 1500)); // Allow JS content to load

    const content = await page.evaluate(() => {
        return document.body.innerText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 30)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
    });

    await browser.close();
    return content;
}

app.post('/analyze', async (req, res) => {
    const { url } = req.body;

    if (!url) return res.status(400).json({ message: "URL is required." });

    try {
        console.log("Fetching (via Puppeteer):", url);

        const text = await fetchWithPuppeteer(url);
        const usedBrowser = true;

        const snippet = text.slice(0, 200);

        if (!snippet || snippet.length < 30) {
            return res.status(500).json({ message: "Failed to extract meaningful content." });
        }

        console.log("Snippet Sent:", snippet);

        const apiResponse = await fetch(NLP_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: snippet })
        });

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.error("❌ NLP API error:", errorText);
            return res.status(500).json({ message: "NLP API request failed." });
        }

        const apiData = await apiResponse.json();
        return res.json({ ...apiData, snippet, usedBrowser });

    } catch (error) {
        console.error("Error during analysis:", error.message);
        return res.status(500).json({ message: "Server error during analysis." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
