import { states } from "../../utils";
import Cleave from "cleave.js";

export type TextFieldElement = HTMLElement & { textField?: TextField };

export type TextFieldValidate =
  | "phone"
  | "date"
  | "time"
  | "required"
  | "email"
  | "telEmail"
  | "text"
  | "description"


export interface TextFieldValidateResult {
  isValid: boolean;
  error: TextFieldValidate | null;
}

export type TextFieldInput = HTMLInputElement & {
  cleave?: Cleave;
};

export class TextField {
  el: TextFieldElement;
  field: TextFieldInput;
  error: HTMLElement;
  validate: TextFieldValidate[];

  defaultTextError: string;
  textError: string;

  constructor(element: HTMLElement) {
    this.el = element;

    this.init();
  }

  private init = () => {
    this.field = this.el.querySelector<HTMLInputElement>(
      ".js-text-field-input",
    );
    this.error = this.el.querySelector<HTMLInputElement>(
      '.js-text-field-error'
    );

    if (this.field.getAttribute("autocomplete") === "off") {
      this.field.setAttribute("readonly", "");
      this.field.addEventListener("focus", () => this.field.removeAttribute("readonly"));
    }

    this.defineValidate();
    this.initValidate();

    this.el.classList.add(states.init);
    this.el.textField = this;
  };

  public defineValidate = () => {
    const validateString = this.field.getAttribute("data-validate");

    if (!validateString) {
      this.validate = [];

      return;
    }

    const validateArray = validateString
      .replace(/\s/g, "")
      .split(",") as TextFieldValidate[];

    this.validate = validateArray;
  };

  public initValidate = () => {
    this.validate.forEach((setting) => {
      switch (setting) {
        case "phone": {
          this.field.value = this.field.value.replace(/^7|\+7/, "");

          this.field.addEventListener("input", (e) => {
            const target = e.target as TextFieldInput;
            const rawValue = target.value.replace(/\D/g, "");
            const lastValue = (target.cleave as any).lastInputValue.replace(
              /\D/g,
              "",
            );

            if (rawValue.length === 0) {
              this.field.cleave?.setRawValue("+7");
            } else if (rawValue.length === 11) {
              if (["7", "8"].includes(rawValue[0])) {
                this.field.cleave?.setRawValue("+7" + rawValue.slice(1));
              }
            } else if (rawValue.length === 12) {
              if (["7", "8"].includes(rawValue[1]) && lastValue.length < 10) {
                this.field.cleave?.setRawValue("+7" + rawValue.slice(2));
              }
            }
          });

          this.field.cleave = new Cleave(this.field, {
            blocks: [2, 0, 3, 3, 2, 2],
            delimiters: [" ", "(", ") ", " ", " "],
            delimiterLazyShow: true,
            numericOnly: true,
            prefix: "+7",
            noImmediatePrefix: true,
            onValueChanged: () => {
              if (this.field.value) {
                this.el.classList.add(states.filled);
              }
            }
          });

          break;
        }
        case "time": {
          this.field.cleave = new Cleave(this.field, {
            time: true,
            delimiter: ':',
            timePattern: ['h', 'm'],
          });

          break;
        }
        case "date": {
          const today = new Date();

          this.field.cleave = new Cleave(this.field, {
            date: true,
            delimiter: '.',
            datePattern: ['d', 'm', 'Y'],
            dateMin: today.toISOString().slice(0, 10),
            dateMax: new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()).toISOString().slice(0, 10),
          });

          break;
        }
      }
    });
  };

  public setDisabled = () => {
    this.el.classList.add(states.disabled);
    this.field.setAttribute("disabled", "");
  };

  public setError = (text: string, time: number = 2000) => {
    if (this.error) {
      this.error.textContent = text;
      this.el.classList.add(states.error);
      this.setDisabled();
    }

    setTimeout(() => {
      this.el.classList.remove(states.error);
      this.error.textContent = this.defaultTextError;
      this.removeDisabled();
      this.field?.focus();
    }, time);
  }

  public removeDisabled = () => {
    this.el.classList.remove(states.disabled);
    this.field.removeAttribute("disabled");
  };

  public checkValid = (): TextFieldValidateResult => {
    const validation: TextFieldValidateResult = {
      isValid: true,
      error: null,
    };

    if (this.validate.includes("required")) {
      if (this.validate.find((v) => v === "phone")) {
        if (this.field.cleave?.getRawValue() === "+7") {
          validation.isValid = false;
          validation.error = "required";
        }
      } else {
        if (!this.field.value.trim().length) {
          validation.isValid = false;
          validation.error = "required";
        }
      }
    }

    if (validation.isValid) {
      for (let setting of this.validate.filter((v) => v !== "required")) {
        switch (setting) {
          case "phone": {
            if (
              this.field.cleave?.getRawValue().trim() !== "+7" &&
              this.field.cleave?.getRawValue().length !== 12
            ) {
              validation.isValid = false;
              validation.error = "phone";
            }

            break;
          }
          case "date": {
            if (
              this.field.cleave?.getRawValue().length &&
              this.field.cleave?.getRawValue().length !== 8
            ) {
              validation.isValid = false;
              validation.error = "date";
            }

            break;
          }
          case "email": {
            if (
              this.field.value &&
              !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
                this.field.value,
              )
            ) {
              validation.isValid = false;
              validation.error = "email";
            }

            break;
          }
          case "telEmail": {
            if (
              this.field.value &&
              !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
                this.field.value,
              ) &&
              !/^(\+7|7|8){0,2}(\s){0,1}(\(){0,1}(\d){3}(\)){0,1}(-|\s){0,1}(\d){3}(-|\s){0,1}(\d){2}(-|\s){0,1}(\d){2}$/i.test(
                this.field.value,
              )
            ) {
              validation.isValid = false;
              validation.error = "telEmail";
            }

            break;
          }
          case "text": {
            if (
              this.field.value &&
              !/^[а-яА-Яa-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
                this.field.value,
              )
            ) {
              validation.isValid = false;
              validation.error = "text";
            }

            break;
          }
          case "description": {
            if (!this.field.value) {
              validation.isValid = false;
              validation.error = "description";
            }

            break;
          }
        }
      }
    }

    return validation;
  };
}

export function initTextFields() {
  const textFields = document.querySelectorAll<HTMLElement>(
    `.js-text-field:not(.${states.init})`,
  );

  textFields.forEach((textField) => {
    new TextField(textField);
  });
}

export function initTextFieldsByFormId(id: string, hard: boolean = false) {
  const textFields = document.querySelectorAll<HTMLElement>(
    `#${id}.js-form .js-text-field${!hard ? `:not(.${states.init})` : ""}`,
  );

  textFields.forEach((textField) => {
    new TextField(textField);
  });
}
