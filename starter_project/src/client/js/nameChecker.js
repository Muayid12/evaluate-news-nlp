function checkForURL(inputText) {
    console.log("::: Running checkForURL :::", inputText);

    
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-]*)*\/?(\?.*)?$/i;

    if (urlPattern.test(inputText)) {
        alert("Valid URL!");
    } else {
        alert("Enter a valid URL");
    }
}

export { checkForURL };