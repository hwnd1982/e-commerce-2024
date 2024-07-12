import { copyTextToClipboard, states } from "../../utils";

export function initClipboardMail() {
  const links = document.querySelectorAll('.js-clipboard-mail');

  links.forEach(link => link.addEventListener('click', (e: Event) => {
    const { currentTarget } = e;

    e.preventDefault();
    copyTextToClipboard((currentTarget as HTMLElement).getAttribute('href'), () => {
      link.classList.add(states.active);
      setTimeout(() => link.classList.remove(states.active), 2000);
    });
  }));
}