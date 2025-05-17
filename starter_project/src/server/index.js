const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const open = require('open').default;
const path = require('path');

puppeteer.use(StealthPlugin());
require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const app = express();

const PORT = 8081;
const NLP_API_ENDPOINT = 'https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../dist')));

app.post('/analyze', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: "URL is required." });

    try {
        const text = await fetchWithPuppeteer(url);
        const snippet = text.slice(0, 200);

        if (!snippet || snippet.length < 30) {
            return res.status(500).json({ message: "Failed to extract meaningful content." });
        }

        const apiResponse = await fetch(NLP_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: snippet })
        });

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            return res.status(500).json({ message: "NLP API request failed." });
        }

        const apiData = await apiResponse.json();
        return res.json({ ...apiData, snippet });

    } catch (error) {
        console.error("Server error:", error.message);
        return res.status(500).json({ message: "Server error during analysis." });
    }
});

async function fetchWithPuppeteer(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 1500));

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

app.listen(PORT, async () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    await open(`http://localhost:${PORT}`);
});