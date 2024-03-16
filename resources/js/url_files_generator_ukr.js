const selectSystem = document.getElementById("select-system");
const url = document.getElementById("url");
const generateButton = document.getElementById("generate");
const download = document.getElementById("download-a");

function generate() {
    var system = selectSystem.value;
    var URL = url.value;
    
    if (system == "Виберіть систему") {
        alert("Помилка: система не вибрана. Будь ласка виберіть систему.");
        return undefined;
    } else if (URL == "") {
        alert("Помилка: відсутнє посилання. Будь ласка введіть посилання.");
        return undefined;
    } else if (!URL.startsWith("http://") && !URL.startsWith("https://")) {
        alert("Помилка: посилання не починається з http:// або з https://.");
        return undefined;
    }
    
    download.setAttribute("class", "invisible");
    
    if (system == "Windows") {
        var file = "[InternetShortcut]\nURL=" + URL;
        download.setAttribute("download", "file.url");
    } else if (system = "MacOS") {
        var file = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\"><plist version=\"1.0\"><dict><key>URL</key><string>" + URL + "</string></dict></plist>";
        download.setAttribute("download", "file.webloc");
    }
    
    try {
        var fileBase64 = btoa(file);
    } catch (e) {
        alert("Помилка: " + e + ". Спробуйте прибрати спеціальні символи та букви не литиниці (кирилиці).")
        return undefined;
    }
    
    var fileBase64URL = "data:text/plain;base64," + fileBase64;
    download.setAttribute("href", fileBase64URL);
    download.removeAttribute("class");
}

generateButton.addEventListener("click", generate);
