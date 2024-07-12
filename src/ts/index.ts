import { initCasesSliders, initClipboardMail, initUploadFiles, sendDesignSupportRequest } from "./modules";

document.addEventListener("DOMContentLoaded", initIndex);

function initIndex() {
  initUploadFiles();
  initCasesSliders();
  initClipboardMail();
  sendDesignSupportRequest();
}