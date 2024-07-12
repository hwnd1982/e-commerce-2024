import type { TextFieldElement, TextFieldValidate } from "../../ui/text-field";
import { debounce, states } from "../../utils";
import { initTextFieldsByFormId } from "../../ui/text-field";



export type ValidateFormElement = HTMLFormElement & { validate?: ValidateForm };

export interface ValidateFormFields {
  inputs?: Array<TextFieldElement>;
  textareas?: [];
  submit?: HTMLButtonElement;
}

export class ValidateForm {
  el: ValidateFormElement;
  fields: ValidateFormFields;
  error: HTMLElement | null;
  isPending?: boolean;

  constructor(element: HTMLFormElement) {
    this.el = element;

    this.init();
  }

  private init = () => {
    this.initFields();
    this.initListeners();

    this.el.classList.add(states.init);
    this.el.validate = this;
  };

  public initFields = () => {
    this.fields = {};

    this.fields.submit =
      this.el.querySelector<HTMLButtonElement>(".js-form-submit");
    this.error =
      this.el.querySelector<HTMLButtonElement>('.js-form-validation-error-message');
    this.fields.inputs = [
      ...this.el.querySelectorAll<TextFieldElement>(".js-text-field"),
    ];
  };

  public initListeners = () => {
    this.el.addEventListener("focusin", this.handleFocusIn);
    this.el.addEventListener("submit", this.handleSubmitForm);
    this.el.addEventListener("focusout", this.handleFocusOut);
    this.el.addEventListener("input", debounce(this.handleInput, 150));
  };

  private handleSubmitForm = async (e: SubmitEvent) => {
    e.preventDefault();

    const id = this.el.getAttribute("data-form-id");

    console.log(`form.submit.${id}`);
    document.dispatchEvent(
      new CustomEvent(id ? `form.submit.${id}` : "form.submit", {
        detail: {
          event: e,
          formInstance: this,
        },
      }),
    );
  };

  private handleFocusIn = (e: Event) => {
    const target = e.target as HTMLInputElement;

    const field = target.closest(".js-text-field") as TextFieldElement;

    if (!field) return;

    field.classList.remove(states.error, states.warning);
  };

  private handleFocusOut = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const field = (target.closest(".js-text-field") as TextFieldElement);

    if (!field) return;

    if (field.classList.contains(states.filled)) {
      this.checkValidByField(field);
    }
  };

  public handleInput = () => {
    if (this.isPending) return;

    if (this.checkValidForm()) {
      this.removeSubmitDisabled();
    } else {
      this.setSubmitDisabled();
    }
  };

  public setSubmitDisabled = () => {
    if (this.isPending) return;

    this.fields.submit?.setAttribute("disabled", "");
  };

  public removeSubmitDisabled = () => {
    if (this.isPending) return;

    this.fields.submit?.removeAttribute("disabled");
  };

  public checkValidByField = (field: TextFieldElement) => {
    let validate: {
      isValid: boolean;
      error: TextFieldValidate | null;
    };


    validate = field.textField.checkValid();

    const { isValid, error } = validate;

    if (isValid) {
      field.classList.add(states.valid);
      field.classList.remove(states.error, "is-error-required");
    } else {
      field.classList.remove(states.error, "is-error-required");
      field.classList.remove(states.valid);
      field.classList.add(states.error);

      if (error === "required") {
        field.classList.add("is-error-required");
      }
    }
  };

  public checkValidForm = (checkValidFields: boolean = false) => {
    let isValid = true;

    this.fields.inputs.forEach((input) => {
      if ("textField" in input) {
        input.classList[input.textField.field.value ? "add" : "remove"](states.filled);
      }

      if (checkValidFields && ("textField" in input)) {
        this.checkValidByField(input);
      }

      if ("textField" in input) {
        if (!input.textField.checkValid().isValid) {
          isValid = false;
        }
      }
    });

    if (checkValidFields) {
      this.error?.classList[isValid ? "remove" : 'add'](states.active);
    }

    return isValid;
  };
}

export function initValidateForms() {
  const forms = document.querySelectorAll<HTMLFormElement>(
    `.js-form:not(.${states.init})`,
  );

  forms.forEach((form) => {
    new ValidateForm(form);
  });
}

export function fullReInitFormById(id: string, hard: boolean = false) {
  initTextFieldsByFormId(id, hard);
  initValidateFormById(id, hard);
}

export function initValidateFormById(id: string, hard: boolean = false) {
  if (!id) return;

  const forms = document.querySelectorAll<HTMLFormElement>(
    `#${id}.js-form${!hard ? `:not(.${states.init})` : ''}`,
  );

  forms.forEach((form) => {
    new ValidateForm(form);
  });
}

export function triggerValidateFormById(id: string) {
  if (!id) return;

  const forms = document.querySelectorAll<ValidateFormElement>(
    `#${id}.js-form.${states.init}`,
  );

  forms.forEach((form) => {
    form.validate.handleInput();
  });
}
