/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from "@wordpress/interactivity";

store("sidebar", {
  actions: {
    toggle: () => {
      const context: ContextI = getContext();
      context.isOpen = !context.isOpen;
    },
    init: () => {
      const { autoplay, delay }: ContextI = getContext();
      const { ref } = getElement();
      console.log("ref", ref);
      const element: HTMLElement | null = ref;
      if (!element) return;
      carouselScript({ autoplay, delay, element });
    },
  },
  callbacks: {
    logIsOpen: () => {
      const { isOpen }: ContextI = getContext();
      // Log the value of `isOpen` each time it changes.
      console.log(`Is open: ${isOpen}`);
    },
  },
});
interface ContextI {
  autoplay: boolean;
  isOpen: boolean;
  delay: number;
}

function carouselScript({ autoplay, delay, element }: { autoplay: boolean; delay: number; element: HTMLElement }) {
  if (!element) return;
  const carousel: HTMLElement | null = element.querySelector(".carousel") as HTMLElement;
  if (!carousel) return;
  const items: NodeListOf<HTMLElement> | null = carousel.querySelectorAll(".carousel-item");
  if (!items || items === null) return;
  const totalItems = items.length;
  const bullets: NodeListOf<HTMLElement> | null = carousel.querySelectorAll(".bullet");
  const arrowLeft: HTMLElement | null = carousel.querySelector(".arrow-left");
  if (!arrowLeft) return;
  arrowLeft.addEventListener("click", () => {
    prevItem();
  });

  const arrowRight: HTMLElement | null = carousel.querySelector(".arrow-right");
  if (!arrowRight) return;
  arrowRight.addEventListener("click", () => {
    nextItem();
  });
  if (!bullets) return;

  bullets[0].classList.add("bullet-active");
  bullets.forEach((bullet) => {
    bullet.addEventListener("click", () => {
      const index = Array.from(bullets).indexOf(bullet);
      currentIndex = index;
      showItem(currentIndex);
    });
  });

  let currentIndex = 0;
  let startX: number;
  let endX: number;
  let initialOpacity: number;
  let intervalId: number | null = null;
  let isHovered = false;

  function showItem(index: number) {
    if (!items) return;
    items.forEach((item, i) => {
      item.style.opacity = i === index ? "1" : "0";
    });
    bullets?.forEach((bullet, i) => {
      bullet.classList.remove("bullet-active");
      if (i === index) {
        bullet.classList.add("bullet-active");
      }
    });
  }

  function nextItem() {
    clearBullets();
    if (!bullets) return;
    bullets[currentIndex].classList.add("bullet-active");
    currentIndex = (currentIndex + 1) % totalItems;
    showItem(currentIndex);
  }

  function clearBullets() {
    bullets?.forEach((bullet) => {
      bullet.classList.remove("bullet-active");
    });
  }

  function prevItem() {
    clearBullets();
    if (!bullets) return;
    bullets[currentIndex].classList.add("bullet-active");
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showItem(currentIndex);
  }

  function handleSwipe(startX: number, endX: number) {
    if (startX > endX) {
      nextItem();
    } else {
      prevItem();
    }
  }

  function handleTouchMove(e: TouchEvent) {
    const moveX = e.touches[0].clientX;
    const diff = startX - moveX;
    const opacity = Math.max(0, Math.min(1, 1 - Math.abs(diff) / window.innerWidth));
    if (!items) return;
    items[currentIndex].style.opacity = `${opacity}`;
    if (startX > moveX) {
      items[(currentIndex + 1) % totalItems].style.opacity = `${1 - opacity}`;
    } else {
      items[(currentIndex - 1 + totalItems) % totalItems].style.opacity = `${1 - opacity}`;
    }
  }

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    initialOpacity = parseFloat(items[currentIndex].style.opacity) || 1;
  });

  carousel.addEventListener("touchmove", (e) => {
    handleTouchMove(e);
  });

  carousel.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe(startX, endX);
    showItem(currentIndex); // Reset to current index to ensure the proper item is displayed with full opacity
  });

  // Initial display
  showItem(currentIndex);

  // Auto slide
  if (autoplay) {
    startAutoSlide();
    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);
  }

  function startAutoSlide() {
    isHovered = false;
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(nextItem, delay) as unknown as number;
  }

  function stopAutoSlide() {
    isHovered = true;
    if (intervalId) clearInterval(intervalId);
  }
}
