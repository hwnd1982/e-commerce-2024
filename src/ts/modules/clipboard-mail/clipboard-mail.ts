import { copyTextToClipboard } from "../../utils";

export function initClipboardMail() {
  const links = document.querySelectorAll('.js-clipboard-mail');

  links.forEach(link => link.addEventListener('click', (e: Event) => {
    const { currentTarget } = e;

    e.preventDefault();
    copyTextToClipboard((currentTarget as HTMLElement).getAttribute('href'));
  }));
}