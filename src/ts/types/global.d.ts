import type { ILazyLoadInstance } from "vanilla-lazyload";
import type { OpenCustomModalProps } from "../ui/modal";
import { Store } from "../utils";
import { Scrollbar } from "../utils/scrollbar";

export interface WindowEndpoints { }

declare global {
  interface Window {
    scrollbar: Scrollbar;
    openCustomModal?: (props: OpenCustomModalProps) => void;
    openModalById?: (id: string) => void;
    closeModalById?: (id: string) => void;
    initValidateFormById?: (id: string, hard?: boolean) => void;
    triggerValidateFormById?: (id: string) => void;
    initTextFieldsByFormId?: (id: string, hard?: boolean) => void;
    initRadiosByFormId?: (id: string, hard?: boolean) => void;
    fullReInitFormById?: (id: string, hard?: boolean) => void;
    assetsUrl?: string;
    endpoints: WindowEndpoints;
    lazyload: ILazyLoadInstance;
    store: Store;
  }
}
