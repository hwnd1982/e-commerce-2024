import { initCasesSliders, initClipboardMail, initUploadFiles, initValidateForms, sendDesignSupportRequest } from "./modules";
import { initAutoheightAextarea, initModals, initSwiperOverflow, initTextFields } from "./ui";
import { initScrollbar } from "./utils";

document.addEventListener("DOMContentLoaded", initIndex);

function initIndex() {
  initTextFields();
  initAutoheightAextarea();
  initValidateForms();
  initModals();

  initSwiperOverflow();
  initScrollbar();

  initUploadFiles();
  initCasesSliders();
  initClipboardMail();
  sendDesignSupportRequest();
}