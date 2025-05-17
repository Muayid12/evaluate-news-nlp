import { handleSubmit } from './js/formHandler';

import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

console.log("App initialized successfully");

const form = document.getElementById('urlForm');
if (form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        try {
            const result = await handleSubmit(e);
            localStorage.setItem('lastAnalysis', JSON.stringify(result));
        } catch (error) {
            console.error("Live request failed. Attempting to load last saved result...");
            const saved = localStorage.getItem('lastAnalysis');
            if (saved) {
                const data = JSON.parse(saved);
                document.getElementById('results').innerHTML = `
                    <div class="result-card">
                        <h3>Offline Cached Result</h3>
                        <pre>${JSON.stringify(data, null, 2)}</pre>
                    </div>
                `;
            } else {
                alert("Server is unreachable and no saved data available.");
            }
        }
    });
}