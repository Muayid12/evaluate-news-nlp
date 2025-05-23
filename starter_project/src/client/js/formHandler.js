import { checkForURL } from './checker';

// Update the endpoint to use Netlify Functions in production
const NLP_API_ENDPOINT = process.env.NODE_ENV === 'production' 
    ? '/.netlify/functions/analyze' 
    : 'http://localhost:8081/analyze';

async function handleSubmit(event) {
    event.preventDefault();
    const url = document.getElementById('name').value.trim();

    if (!url || !checkForURL(url)) return;

    try {
        document.getElementById('results').innerHTML = '<div class="loading">Fetching and analyzing content...</div>';

        const apiResponse = await fetch(NLP_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        if (!apiResponse.ok) throw new Error('Server error');

        const analysis = await apiResponse.json();
        renderResults(analysis, analysis.snippet);
        saveToLocalStorage(url, analysis);
        return analysis;

    } catch (error) {
        console.warn("Server offline. Trying cache...");

        const cached = loadFromLocalStorage(url);
        if (cached) {
            renderResults(cached.result, cached.result.snippet);
            document.getElementById('results').innerHTML += `
                <div class="notice">⚠️ Showing cached result. Server may be offline.</div>
            `;
            return cached.result;
        }

        document.getElementById('results').innerHTML = `
            <div class="error">
                ❌ Could not analyze URL.<br>
                ⚠️ No cached result found.
            </div>
        `;
    }
}

function renderResults(data, snippet) {
    const scores = data.sentiment_scores;
    document.getElementById('results').innerHTML = `
        <div class="result-card">
            <h3>Analysis Results</h3>
            <p><strong>Character Count:</strong> ${snippet.length} / 200</p>
            <p><strong>Sentiment:</strong> ${data.sentiment}</p>
            <p><strong>Scores:</strong></p>
            <ul>
                <li>Positive: ${scores.Positive}</li>
                <li>Negative: ${scores.Negative}</li>
                <li>Neutral: ${scores.Neutral}</li>
                <li>Mixed: ${scores.Mixed}</li>
            </ul>
            <p><strong>Text Preview:</strong></p>
            <p>${snippet}</p>
        </div>
    `;
}

function saveToLocalStorage(url, analysis) {
    const prev = JSON.parse(localStorage.getItem('savedAnalyses')) || [];
    const entry = { url, timestamp: new Date().toISOString(), result: analysis };
    const filtered = prev.filter(e => e.url !== url);
    filtered.unshift(entry);
    localStorage.setItem('savedAnalyses', JSON.stringify(filtered.slice(0, 10)));
}

function loadFromLocalStorage(url) {
    const saved = JSON.parse(localStorage.getItem('savedAnalyses')) || [];
    return saved.find(e => e.url === url);
}

export { handleSubmit };
