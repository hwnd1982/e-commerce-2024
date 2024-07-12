import axios from "axios";
import { ValidateForm, ValidateFormElement } from "../validate";

export function sendDesignSupportRequest() {
  document.addEventListener('form.submit.design-support-form', async (e: CustomEvent) => {
    const form: ValidateForm = e.detail.formInstance;

    form.setSubmitDisabled();
    if (form.checkValidForm(true)) {
      const data = new FormData(form.el);
      const method = form.el.getAttribute('action');
      const url = form.el.getAttribute('action');

      try {
        await axios(url, { data, method });
      } catch (err) {
        window.openCustomModal({ title: 'Ошибка', button: 'Хорошо', description: 'Попробуйте отправить запрос позднее...' })
      }
    }
  });
}