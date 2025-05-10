// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

// Initialize the Express application
const app = express();

// Apply middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Encapsulated function to scrape text from a URL
async function scrapeTextFromURL(url) {
    try {
        console.log(`Fetching and scraping text from URL: ${url}`);

        // Fetch the webpage data
        const { data } = await axios.get(url);

        // Use Cheerio to load the HTML and extract the text
        const $ = cheerio.load(data);
        const text = $('body').text().trim();

        // Check if text content exists
        if (!text) {
            console.error('No text content found at the provided URL');
            return null;
        }

        // Extract and return the first 200 characters of the text
        const trimmedText = text.slice(0, 200);
        console.log(`Extracted Text (200 characters):\n${trimmedText}\n--- End of Text Preview ---`);
        return trimmedText;
    } catch (error) {
        console.error('Error while scraping text from the URL:', error.message);
        throw new Error('Failed to scrape text from the URL');
    }
}

// Route to analyze text from a URL
app.post('/analyze-url', async (req, res) => {
    const { url } = req.body;

    // Validate the input URL
    if (!url) {
        console.error('No URL provided in the request body');
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Step 1: Scrape text from the provided URL
        const text = await scrapeTextFromURL(url);

        if (!text) {
            return res.status(400).json({ error: 'No text content found at the provided URL' });
        }

        // Step 2: Connect to the AWS NLP API
        // --- Learner Task: Add the code to send the extracted text to the AWS NLP API below ---
        // Use `axios.post` to send a POST request to the API.
        // The endpoint URL is: https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer
        // Send the `text` as part of the request body.

        /*
        Example Code:
        const response = await axios.post('https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer', { text });
        return res.json(response.data); // Send the NLP results back to the client
        */

        // Placeholder response for learners to complete
        return res.json({ message: 'NLP analysis result will be here. Complete the API call above!' });
    } catch (error) {
        console.error('Error during URL processing or API request:', error.message);
        return res.status(500).json({ error: 'Failed to analyze the URL' });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send("This is the server API page. You may access its services via the client app.");
});

// Start the server
app.listen(8000, () => {
    console.log('Server running on port 8000');
});
