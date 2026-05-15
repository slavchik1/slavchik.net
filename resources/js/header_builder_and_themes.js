function changeTheme(theme) {
    const cssThemes = {
        "light": `
:root {
    --bg-color: white;
    --page-color: #F9F9F9;
    --text-color: black;
    --a-color: blue;
}

hr {
    border-top: 1px solid gray;
    border-bottom: 1px solid #EEEEEE;
}`,
        "dark": `
:root {
    --bg-color: #070707;
    --page-color: #252525;
    --text-color: white;
    --a-color: lightblue;
}

hr {
    border-top: 1px solid #171717;
    border-bottom: 1px solid gray;
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
