import axios from "axios";
import { ValidateForm, ValidateFormElement } from "../validate";
import { ModalElement } from "src/ts/ui";

export function sendDesignSupportRequest() {
  document.addEventListener('form.submit.design-support-form', async (e: CustomEvent) => {
    const form: ValidateForm = e.detail.formInstance;

    form.setSubmitDisabled();
    if (form.checkValidForm(true)) {
      const data = new FormData(form.el);
      const method = form.el.getAttribute('action');
      const url = form.el.getAttribute('action');
      const modal: ModalElement = form.el.closest('.js-modal');

      try {
        await axios(url, { data, method });
      } catch (err) {
        console.log(err);
        if (modal) {
          modal.modal.close();
        }
        window.openCustomModal({ title: 'Ошибка', img: 'img/thanks.svg', description: 'Попробуйте отправить запрос позднее...' });
        setTimeout(form.removeSubmitDisabled, 500);
      }
    }
  });
}