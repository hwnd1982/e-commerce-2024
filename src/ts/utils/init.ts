import PerfectScrollbar from "perfect-scrollbar";
import { initScrollTo } from "../modules";
import { initVh } from "./vh";

export function initBase() {
  initScrollTo();
  initVh();

  document.querySelectorAll('.custom-scroll').forEach(s =>
    window.store.customScrollbars.push(new PerfectScrollbar(s)));
}