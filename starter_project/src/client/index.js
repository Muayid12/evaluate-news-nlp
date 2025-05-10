// Import functions
import { handleSubmit } from './js/formHandler';

// Setup form submission
const form = document.getElementById('urlForm');
if (form) {
    form.addEventListener('submit', handleSubmit);
}

// Import styles
import './styles/resets.scss';
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

console.log("App initialized successfully");