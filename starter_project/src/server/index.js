// server.js
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/analyze', async (req, res) => {
    try {
        const { url } = req.body;
        
        // 1. Scrape content
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const text = $('body').text().replace(/\s+/g, ' ').trim();
        
        // 2. Extract first 200 characters
        const textPreview = text.substring(0, 200);
        
        // 3. Call NLP API (pseudo-code)
        const analysis = await analyzeText(textPreview); 
        
        // 4. Return results
        res.json({
            sentiment: analysis.polarity > 0 ? 'Positive' : 'Negative',
            subjectivity: analysis.subjectivity > 0.5 ? 'Subjective' : 'Objective',
            textPreview
        });
        
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

app.listen(8081, () => console.log('Server running on port 8081'));

// Mock NLP analysis function
async function analyzeText(text) {
    // In reality, call Udacity NLP API here
    return {
        polarity: Math.random() > 0.5 ? 1 : -1,
        subjectivity: Math.random()
    };
}