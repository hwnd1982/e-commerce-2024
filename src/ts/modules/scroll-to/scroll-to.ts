export function initScrollTo() {
  document.querySelectorAll('.js-scroll-to').forEach((link: HTMLElement) => {
    link.addEventListener('click', (e: Event) => {
      const target = document.querySelector(link.getAttribute('href'));

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    });
  });
}
