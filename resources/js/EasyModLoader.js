import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

document.getElementById("area-to-paste").innerHTML = marked.parse(document.getElementById("markdown").textContent);
