// src/client/js/formHandler.js
function handleSubmit(event) {
  event.preventDefault(); // This stops the default form submission
  
  const form = event.target;
  const url = form.elements.url.value;
  const resultsDiv = document.getElementById('results');

  // Clear previous results and show loading
  resultsDiv.innerHTML = '<div class="loading">Analyzing...</div>';

  fetch('http://localhost:8081/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    resultsDiv.innerHTML = `
      <div class="result-card">
        <h3>Analysis Results</h3>
        <p><strong>Sentiment:</strong> ${data.sentiment}</p>
        <p><strong>Subjectivity:</strong> ${data.subjectivity}</p>
        <p><strong>Confidence:</strong> ${data.confidence}%</p>
        <div class="text-preview">
          <h4>Text Preview:</h4>
          <p>${data.textPreview}...</p>
        </div>
      </div>
    `;
  })
  .catch(error => {
    resultsDiv.innerHTML = `
      <div class="error">Error analyzing URL: ${error.message}</div>
    `;
    console.error('Error:', error);
  });
}

export { handleSubmit };