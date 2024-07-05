import "./style.css";
document.addEventListener("DOMContentLoaded", function () {
  const images: NodeListOf<HTMLImageElement> | null = document.querySelectorAll("img[data-src-small]");
  if (!images) return;

  const loadImages = (image: HTMLImageElement) => {
    const smallSrc = image.getAttribute("data-src-small");
    const largeSrc = image.getAttribute("data-src-large");
    if (!smallSrc || !largeSrc) return;
    // Load small image first
    image.src = smallSrc;

    // Create a new Image object for the large image
    const largeImage = new Image();
    largeImage.src = largeSrc;

    largeImage.onload = () => {
      // Replace small image with large image when large image is loaded
      image.src = largeSrc;
      image.classList.add("loaded");
    };
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image: HTMLImageElement | null = entry.target as HTMLImageElement;
        if (!image) return;
        loadImages(image);
        observer.unobserve(image);
      }
    });
  }, options);

  images.forEach((image) => {
    observer.observe(image);
  });
});
interface ContextI {
  isOpen: boolean;
  index: number;
  slideCount: number;
  isButtonControlToFirst: boolean;
  isButtonControlToLast: boolean;
}

function slider() {
  const context: ContextI = {
    isOpen: false,
    index: 0,
    slideCount: document.querySelectorAll(".slide").length,
    isButtonControlToFirst: false,
    isButtonControlToLast: false,
  };

  const sliderSection = document.querySelector<HTMLElement>(".slider-section");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const autoplay = () => {
    if (!sliderSection) return;
    let autoSlideInterval = setInterval(() => {
      context.index = (context.index + 1) % context.slideCount;
      scrollToIndex(context.index);
    }, 1000);

    sliderSection.addEventListener("pointerenter", () => {
      clearInterval(autoSlideInterval);
    });

    sliderSection.addEventListener("pointerleave", () => {
      autoSlideInterval = setInterval(() => {
        context.index = (context.index + 1) % context.slideCount;
        scrollToIndex(context.index);
      }, 1000);
    });
  };

  const handleGesture = () => {
    if (!sliderSection) return;
    let touchStartX = 0;
    let touchEndX = 0;

    sliderSection.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].screenX;
    });

    sliderSection.addEventListener("touchend", (event) => {
      touchEndX = event.changedTouches[0].screenX;
      if (touchEndX < touchStartX) {
        // Swiped left
        next();
      }

      if (touchEndX > touchStartX) {
        // Swiped right
        prev();
      }
    });
  };

  const prev = () => {
    if (context.index > 0) {
      context.index--;
    } else {
      context.isButtonControlToLast = true;
      context.index = context.slideCount - 1; // Jump to the last item
      context.isButtonControlToLast = false;
    }
    scrollToIndex(context.index);
  };

  const next = () => {
    if (context.index < context.slideCount - 1) {
      context.index++;
    } else {
      context.isButtonControlToFirst = true;
      context.index = 0; // Jump to the first item
      context.isButtonControlToFirst = false;
    }
    scrollToIndex(context.index);
  };

  const scrollToIndex = (index: number) => {
    const slider = document.querySelector<HTMLElement>(".slider");
    if (!slider) return;
    const items = slider.querySelectorAll<HTMLElement>(".slide");
    if (!items) return;
    const item = items[index];
    const itemLeft = item.offsetLeft;
    slider.scrollTo({ left: itemLeft, behavior: "smooth" });
    updateBullets(index);
  };

  const updateBullets = (index: number) => {
    const bullets = document.querySelectorAll<HTMLElement>(".bullet");
    bullets.forEach((bullet, idx) => {
      if (idx === index) {
        bullet.classList.add("bullet-active");
      } else {
        bullet.classList.remove("bullet-active");
      }
    });
  };

  if (prevBtn) prevBtn.addEventListener("click", prev);
  if (nextBtn) nextBtn.addEventListener("click", next);

  autoplay();
  handleGesture();
}
