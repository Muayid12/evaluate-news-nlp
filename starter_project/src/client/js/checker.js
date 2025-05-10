function checkForURL(url) {
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[^\s]*)?$/i;
    const isValid = pattern.test(url);
    
    if (!isValid) {
        alert('Please enter a valid URL starting with http:// or https://');
    }
    
    return isValid;
}

export { checkForURL };