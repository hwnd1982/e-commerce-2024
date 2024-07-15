import PerfectScrollbar from "perfect-scrollbar";
import { initScrollTo, initValidateForms } from "../modules";
import { initModals, initSwiperOverflow, initTextFields, initAutoheightAextarea } from "../ui";
import { initScrollbar } from "./scrollbar";
import { initVh } from "./vh";

export function initBase() {
  initScrollbar();
  initScrollTo();
  initVh();
  initSwiperOverflow();
  initModals();
  initTextFields();
  initAutoheightAextarea();
  initValidateForms();


  document.querySelectorAll('.custom-scroll').forEach(s =>
    window.store.customScrollbars.push(new PerfectScrollbar(s)));
}