const element = document.querySelector("redirect");
const url = element.getAttribute("href");

window.location.replace(url);
element.innerHTML = `<a href=${url}>${url}</a>`;
