import { checkForURL } from './checker';

const NLP_API_ENDPOINT = 'http://localhost:8081/analyze';

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

        if (!apiResponse.ok) {
            const { message } = await apiResponse.json();
            throw new Error(message || 'Unknown error during analysis');
        }

        const analysis = await apiResponse.json();
        renderResults(analysis, analysis.snippet);

    } catch (error) {
        console.error("Error:", error);
        document.getElementById('results').innerHTML = `
            <div class="error">
                ❌ Analysis failed: ${error.message}<br>
                ⚠️ Please try a public article.
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
			<br>
            <p><strong>Text Preview:</strong> ${snippet}</p>
        </div>
    `;
}

export { handleSubmit };
