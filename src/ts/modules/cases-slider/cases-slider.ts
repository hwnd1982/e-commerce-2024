import { ModalElement } from "src/ts/ui";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";

export function initCasesSliders() {
  const sliders = document.querySelectorAll('.js-cases-slider');

  sliders.forEach((slider: HTMLElement) => {
    const nextEl = slider.parentElement.querySelector<HTMLElement>('.js-next');
    const prevEl = slider.parentElement.querySelector<HTMLElement>('.js-prev');
    const modal: ModalElement = slider.closest('.js-modal');


    slider.addEventListener('click', ({ target }) => {
      const trigger = (target as HTMLElement).closest('.js-modal-trigger');

      if (trigger) {
        modal?.modal?.close();
      }
    });

    new Swiper(slider, {
      slidesPerView: "auto",
      direction: "vertical",
      navigation: {
        nextEl,
        prevEl,
      },
      modules: [Navigation],
      breakpoints: {
        1024: {
          direction: "horizontal",
          slidesPerView: 2,
        }
      }
    })
  });
}