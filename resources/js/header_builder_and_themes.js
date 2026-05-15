function changeTheme(theme) {
    const cssThemes = {
        "light": `
:root {
    --bg-color: white;
    --page-color: #F9F9F9;
    --text-color: black;
    --a-color: blue;
}`,
        "dark": `
:root {
    --bg-color: #070707;
    --page-color: #252525;
    --text-color: white;
    --a-color: lightblue;
}`
    }

    let stylesTag = document.getElementById("theme-css")
    
    if (stylesTag == null) {
        document.head.insertAdjacentHTML("beforeend", '<style id="theme-css"></style>')
        stylesTag = document.getElementById("theme-css")
    }

    stylesTag.textContent = cssThemes[theme];
}

changeTheme("light")
