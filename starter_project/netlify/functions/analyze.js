const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

const NLP_API_ENDPOINT = 'https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer';

exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    const { url } = JSON.parse(event.body);
    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'URL is required' })
      };
    }

    // Extract text from the webpage
    const text = await fetchWithPuppeteer(url);
    const snippet = text.slice(0, 200);

    if (!snippet || snippet.length < 30) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to extract meaningful content' })
      };
    }

    // Send the text to the NLP API
    const apiResponse = await fetch(NLP_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: snippet })
    });

    if (!apiResponse.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'NLP API request failed' })
      };
    }

    const apiData = await apiResponse.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ ...apiData, snippet })
    };
  } catch (error) {
    console.log('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error during analysis' })
    };
  }
};

async function fetchWithPuppeteer(url) {
  let browser = null;
  
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
    
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

    return content;
  } catch (error) {
    console.log('Puppeteer error:', error);
    throw error;
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
} 