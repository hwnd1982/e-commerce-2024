import { initCasesSliders, initClipboardMail, initUploadFiles, initValidateForms, sendDesignSupportRequest } from "./modules";
import { initAutoheightAextarea, initModals, initRadios, initSwiperOverflow, initTextFields } from "./ui";

document.addEventListener("DOMContentLoaded", initIndex);

function initIndex() {
  initTextFields();
  initRadios();
  initAutoheightAextarea();
  initValidateForms();
  initModals();

  initSwiperOverflow();

  initUploadFiles();
  initCasesSliders();
  initClipboardMail();
  sendDesignSupportRequest();
}