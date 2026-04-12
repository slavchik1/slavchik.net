const selectFormat = document.getElementById("select-format");
const urlElement = document.getElementById("link");
const generateButton = document.getElementById("generate");
const downloadButton = document.getElementById("download-button");
const lang = document.querySelector("html").getAttribute("lang");
let previousDownloadURL;
let previousDownloadName;
const texts = {
    "error/system not chosen": {
        "en": "Error: a format is not selected. Please select the format.",
        "uk": "Помилка: формат не обрано. Будь ласка, оберіть систему."
    },
    "error/link is missing": {
        "en": "Error: the link is missing. Please enter the link.",
        "uk": "Помилка: посилання відсутнє. Будь ласка, введіть посилання."
    },
    "error/not http(s)": {
        "en": "Error: the link don't start with http:// nor with https://.",
        "uk": "Помилка: посилання не починається ні з http://, ані з https://."
    }
};


function t(key) {
    return texts[key][lang];
}

function clearGeneratedFile() {
    if (previousDownloadURL) {
        URL.revokeObjectURL(previousDownloadURL);
        previousDownloadURL = undefined;
    }

    previousDownloadName = undefined;
    downloadButton.setAttribute("class", "invisible");
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
    
    clearGeneratedFile();
    
    if (format == "url") {
        var file = `[InternetShortcut]\nURL=${url}`;
        previousDownloadName = "file.url";
    } else if (format == "webloc") {
        var file = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict><key>URL</key><string>${url}</string></dict></plist>`;
        previousDownloadName = "file.webloc";
    } else if (format == "html") {
        var file = `<!DOCTYPE html><html><head><script>window.location.replace("${url}")</script></head><body><a href="${url}">${url}</a></body></html>`;
        previousDownloadName = "file.html";
    }

    var blob = new Blob([file], {type: "text/plain;charset=utf-8"});
    var fileURL = URL.createObjectURL(blob);

    previousDownloadURL = fileURL;
    downloadButton.removeAttribute("class");
}

function downloadGeneratedFile() {
    if (!previousDownloadURL || !previousDownloadName) {
        return undefined;
    }

    var a = document.createElement("a");
    a.setAttribute("href", previousDownloadURL);
    a.setAttribute("download", previousDownloadName);
    document.body.appendChild(a);
    a.click();
    a.remove();
}

selectFormat.addEventListener("change", clearGeneratedFile);
urlElement.addEventListener("input", clearGeneratedFile);
generateButton.addEventListener("click", generate);
downloadButton.addEventListener("click", downloadGeneratedFile);
window.addEventListener("beforeunload", clearGeneratedFile);
