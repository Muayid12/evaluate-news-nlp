const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Udacity NLP API endpoint (replace with actual endpoint)
const NLP_API_URL = 'http://localhost:8081/analyze';

// Process URL and analyze content
app.post('/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    
    // 1. Fetch and scrape webpage content
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const text = $('body').text().replace(/\s+/g, ' ').trim();
    
    // 2. Extract first 200 characters
    const textPreview = text.substring(0, 200);
    
    // 3. Send to NLP API
    const nlpResponse = await axios.post(NLP_API_URL, {
      text: textPreview,
      options: {
        sentiment: true,
        classification: true
      }
    });
    
    // 4. Return results
    res.json({
      sentiment: nlpResponse.data.sentiment,
      subjectivity: nlpResponse.data.subjectivity,
      textPreview: textPreview,
      confidence: nlpResponse.data.confidence
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));