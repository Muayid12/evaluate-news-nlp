function checkForURL(url) {
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[^\s]*)?$/i;
    return pattern.test(url);
}

export { checkForURL };