import { states } from "../../utils";
import Swiper from "swiper";

export function initSwiperOverflow() {
  const swipers = document.querySelectorAll<HTMLElement>('.js-swiper-overflow');

  swipers.forEach(swiper => {

    new Swiper(swiper, {
      slidesPerView: "auto",
      freeMode: true,
      watchSlidesProgress: true,
      on: {
        init: setActiveItem,
        resize: setActiveItem,
      }
    });

    function setActiveItem(swiper: Swiper) {
      const activeIndex = swiper.slides.findIndex(slide => slide.classList.contains(states.active)) || 300;

      swiper.slideTo(activeIndex, 300);
    }
  })
}
