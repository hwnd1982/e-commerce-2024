import type { ILazyLoadInstance } from "vanilla-lazyload";
import PerfectScrollbar from "perfect-scrollbar";
import { Scrollbar } from "./scrollbar";

export interface Store {
  scrollbar?: Scrollbar;
  lazyload?: ILazyLoadInstance;
  customScrollbars: PerfectScrollbar[];
}

export const store: Store = {
  customScrollbars: [],
};
