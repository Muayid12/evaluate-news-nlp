// js files
import { handleSubmit } from './js/formHandler'
import { checkForName } from './js/nameChecker'



alert("I EXIST")
// console.log("CHANGE!!");
document.getElementById('urlForm').addEventListener('submit', handleSubmit);
// sass files
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

export {
    checkForName,
    handleSubmit
}