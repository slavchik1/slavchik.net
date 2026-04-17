import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const white = `<hr color="white">`;

document.getElementById("area-to-paste").innerHTML = white + marked.parse(document.getElementById("markdown").textContent) + white;
