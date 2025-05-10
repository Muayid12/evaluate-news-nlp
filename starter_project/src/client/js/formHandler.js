import { checkForURL } from './checker';

const NLP_API_ENDPOINT = 'https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer'; // something wrong with this

async function handleSubmit(event) {
    event.preventDefault();
    const url = document.getElementById('name').value.trim();
    
    if (!url || !checkForURL(url)) return;

    try {
        document.getElementById('results').innerHTML = '<div class="loading">Analyzing URL...</div>';
        console.log("Attempting to fetch:", NLP_API_ENDPOINT);
        
        const response = await fetch(NLP_API_ENDPOINT, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                // 'x-api-key': 'your-api-key-here' // No idea yet if there's api key 
            },
            body: JSON.stringify({ url })
        });

        console.log("Response status:", response.status);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error Details:", errorData);
            throw new Error(errorData.message || 'API request failed');
        }

        const analysis = await response.json();
        console.log("API Response:", analysis);
        renderResults(analysis);
        
    } catch (error) {
        console.error("Full Error:", error);
        document.getElementById('results').innerHTML = `
            <div class="error">
                Analysis failed: ${error.message}<br>
                Check console for details
            </div>
        `;
    }
}

function renderResults(data) {
    document.getElementById('results').innerHTML = `
        <div class="result-card">
            <h3>Analysis Results</h3>
            <p><strong>Sentiment:</strong> ${getSentimentLabel(data.polarity)}</p>
            <p><strong>Subjectivity:</strong> ${getSubjectivityLabel(data.subjectivity)}</p>
            <p><strong>Text Preview:</strong> ${data.snippet || 'No text extracted'}</p>
        </div>
    `;
}

function getSentimentLabel(polarity) {
    if (polarity > 0.2) return 'Positive';
    if (polarity < -0.2) return 'Negative';
    return 'Neutral';
}

function getSubjectivityLabel(score) {
    return score > 0.5 ? 'Subjective' : 'Objective';
}

// for test reason only 
function setupTestButton() {
    const testURL = 'https://www.udacity.com/blog/2024/04/project-based-learning-in-tech-the-value-of-hands-on-education-in-a-digital-age.html';
    
    const testBtn = document.createElement('button');
    testBtn.id = 'testButton';
    testBtn.className = 'test-button';
    testBtn.textContent = 'Test with Udacity Blog';
    
    testBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('name').value = testURL;
        handleSubmit(new Event('submit'));
    });

    const form = document.getElementById('urlForm');
    if (form) form.after(testBtn); // Adds button after the form
}


document.addEventListener('DOMContentLoaded', () => {
    setupTestButton();
});

export { handleSubmit };