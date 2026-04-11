const selectFormat = document.getElementById("select-format");
const urlElement = document.getElementById("link");
const generateButton = document.getElementById("generate");
const download = document.getElementById("download-a");
const lang = document.querySelector("html").getAttribute("lang");
const texts = {
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
};


function t(key) {
    return texts[key][lang];
}

function generate() {
    var format = selectFormat.options[selectFormat.selectedIndex].id;
    var url = urlElement.value.trim();
    
    if (format == "undefined") {
        alert(t("error/system not chosen"));
        return undefined;
    } else if (url == "") {
        alert(t("error/link is missing"));
        return undefined;
    } else if (!url.toLowerCase().startsWith("http://") && !url.toLowerCase().startsWith("https://")) {
        alert(t("error/not http(s)"));
        return undefined;
    }
    
    download.setAttribute("class", "invisible");
    
    if (format == "url") {
        var file = `[InternetShortcut]\nURL=${url}`;
        download.setAttribute("download", "file.url");
    } else if (format == "webloc") {
        var file = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict><key>URL</key><string>${url}</string></dict></plist>`;
        download.setAttribute("download", "file.webloc");
    } else if (format == "html") {
        var file = `<!DOCTYPE html><html><head><script>window.location.replace("${url}")</script></head><body><a href="${url}">${url}</a></body></html>`;
        download.setAttribute("download", "file.html");
    }

    var blob = new Blob([file], {type: "text/plain;charset=utf-8"});
    var fileURL = URL.createObjectURL(blob);

    previousDownloadURL = fileURL;
    download.setAttribute("href", fileURL);
    download.removeAttribute("class");
}

generateButton.addEventListener("click", generate);
