/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from "@wordpress/interactivity";

const { actions, callbacks } = store("ds-catalog", {
  actions: {
    init: () => {
      const context: ContextI = getContext();
      // carouselScript({ autoplay: true, delay: 3000 });
      callbacks.scrollToIndex(0);
      callbacks.handleGesture();
      callbacks.autoplay();
    },
    toggle: () => {
      const context: ContextI = getContext();
      context.isOpen = !context.isOpen;
    },
    prev: () => {
      const context: ContextI = getContext();
      callbacks.prev();
    },
    next: () => {
      callbacks.next();
    },
  },
  callbacks: {
    autoplay: () => {
      const { ref } = getElement();
      const context: ContextI = getContext();
      if (!ref) return;
      const sliderSection: HTMLElement | null = ref.querySelector(".slider-section");
      if (!sliderSection) return;
      let autoSlideInterval = setInterval(() => {
        context.index = (context.index + 1) % context.slideCount;
      }, 1000);

      sliderSection.addEventListener("pointerenter", () => {
        clearInterval(autoSlideInterval);
      });

      sliderSection.addEventListener("pointerleave", () => {
        autoSlideInterval = setInterval(() => {
          context.index = (context.index + 1) % context.slideCount;
        }, 1000);
      });
    },
    handleGesture: () => {
      const { ref } = getElement();
      const context: ContextI = getContext();
      if (!ref) return;
      const carousel: HTMLElement | null = ref.querySelector(".slider");
      if (!carousel) return;
      let touchStartX = 0;
      let touchEndX = 0;

      carousel.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
      });

      carousel.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleGesture();
      });

      const handleGesture = () => {
        if (touchEndX < touchStartX) {
          // Swiped left
          if (context.index < context.slideCount - 1) {
            context.index++;
          } else {
            context.index = 0; // Loop to the first item
          }
        }

        if (touchEndX > touchStartX) {
          // Swiped right
          if (context.index > 0) {
            context.index--;
          } else {
            context.index = context.slideCount - 1; // Loop to the last item
          }
        }
      };
    },

    prev: () => {
      const context: ContextI = getContext();
      const { ref } = getElement();
      console.log("slideCount", context.slideCount);
      if (!ref) return;
      if (context.index > 0) {
        context.index--;
      } else {
        context.isButtonContolToLast = true;
        context.index = context.slideCount - 1; // Jump to the last item
        context.isButtonContolToLast = false;
      }
    },
    next: () => {
      const context: ContextI = getContext();
      const { ref } = getElement();
      if (!ref) return;
      if (context.index < context.slideCount - 1) {
        context.index++;
      } else {
        context.isButtonContolToFirst = true;
        context.index = 0; // Jump to the first item
        context.isButtonContolToFirst = false;
      }
    },
    scrollToIndex: (index: number) => {
      const context: ContextI = getContext();
      const { ref } = getElement();
      if (!ref) return;
      const slider = ref.querySelector(".slider");
      if (!slider) return;
      const items: NodeListOf<HTMLElement> | null = slider.querySelectorAll(".slide");
      if (!items) return;
      // items[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      if (items === null || items.length === 0) return;
      // items[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      const item = items[index];
      const itemLeft = item.offsetLeft;
      slider.scrollTo({ left: itemLeft, behavior: "smooth" });
    },
    changeIndex: () => {
      const context: ContextI = getContext();
    },
    watchIndex: () => {
      const context: ContextI = getContext();
      const { ref } = getElement();
      if (!ref) return;
      callbacks.scrollToIndex(context.index);
      const bullets: NodeListOf<HTMLElement> | null = ref.querySelectorAll(".bullet");
      if (!bullets || bullets.length === 0) return;
      bullets.forEach((bullet, index) => {
        if (index === context.index) bullet.classList.add("bullet-active");
        else bullet.classList.remove("bullet-active");
      });
    },
  },
});
interface ContextI {
  isOpen: boolean;
  index: number;
  slideCount: number;
  isButtonContolToFirst: boolean;
  isButtonContolToLast: boolean;
}
