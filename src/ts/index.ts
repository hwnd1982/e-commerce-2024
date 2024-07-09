import { initCasesSliders, initClipboardMail, initUploadFiles } from "./modules";

document.addEventListener("DOMContentLoaded", initIndex);

function initIndex() {
  initUploadFiles();
  initCasesSliders();
  initClipboardMail();
}