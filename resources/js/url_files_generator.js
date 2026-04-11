const selectSystem = document.getElementById("select-system");
const url = document.getElementById("url");
const generateButton = document.getElementById("generate");
const download = document.getElementById("download-a");
const lang = document.querySelector("html").getAttribute("lang");
const texts = {
    "system/unknown": {
        "en": "Select a system",
        "uk": "Оберіть систему"
    },
    "error/system not chosen": {
        "en": "Error: a system is not selected. Please select the system.",
        "uk": "Помилка: система не обрана. Будь ласка, оберіть систему."
    },
    "error/link is missing": {
        "en": "Error: the link is missing. Please enter the link.",
        "uk": "Помилка: відсутнє посилання. Будь ласка, введіть посилання."
    },
    "error/not http(s)": {
        "en": "Error: link don't starts with http:// nor with https://.",
        "uk": "Помилка: посилання не починається ні з http:// ні з https://."
    },
    "error/undefined error/1": {
        "en": "Error: ",
        "uk": "Помилка: "
    },
    "error/undefined error/2": {
        "en": ". Try to remove special symbols and non-latin letters.",
        "uk": ". Спробуйте прибрати спеціальні символи та букви не литиниці (можливо кирилиці)."
    }
}


function t(key) {
    return texts[key][lang];
}

function generate() {
    var system = selectSystem.value;
    var URL = url.value;
    
    if (system == t("system/unknown")) {
        alert(t("error/system not chosen"));
        return undefined;
    } else if (URL == "") {
        alert(t("error/link is missing"));
        return undefined;
    } else if (!URL.toLowerCase().startsWith("http://") && !URL.toLowerCase().startsWith("https://")) {
        alert(t("error/not http(s)"));
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
        alert(t("error/undefined error/1") + e + t("error/undefined error/2"))
        return undefined;
    }
    
    var fileBase64URL = "data:text/plain;base64," + fileBase64;
    download.setAttribute("href", fileBase64URL);
    download.removeAttribute("class");
}

generateButton.addEventListener("click", generate);
