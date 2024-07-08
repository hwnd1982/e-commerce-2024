export function initAutoheightAextarea() {
  const textareaItems = document.querySelectorAll('.js-autoheight');

  textareaItems.forEach((textarea: HTMLElement) => textarea.addEventListener('keyup', () => {
    textarea.style.height = '0px';
    textarea.style.height = `${textarea.scrollHeight + 2}px`;
  }));
}
