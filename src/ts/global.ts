import LazyLoad from "vanilla-lazyload";
import { initBase, store } from "./utils";
import { closeModalById, openCustomModal, openModalById } from "./ui";
import { initCasesSliders, initUploadFiles } from "./modules";

document.addEventListener("DOMContentLoaded", initGlobal);

if (!window.endpoints) {
  window.endpoints = {};
}

function initGlobal() {
  store.lazyload = new LazyLoad();
  window.lazyload = store.lazyload;
  window.store = store;

  initBase();
  initUploadFiles();
  initCasesSliders();
}

window.openCustomModal = openCustomModal;
window.openModalById = openModalById;
window.closeModalById = closeModalById;