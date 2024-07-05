interface ContextI {
  index: number;
  slideCount: number;
}

class Slider {
  private context: ContextI;
  private sliderSection: HTMLElement;
  private slider: HTMLElement;
  private slides: NodeListOf<HTMLElement>;
  private bullets: NodeListOf<HTMLElement>;
  private prevBtn: HTMLElement | null;
  private nextBtn: HTMLElement | null;
  private autoSlideInterval: NodeJS.Timeout | null = null;

  constructor(sliderSection: HTMLElement) {
    this.sliderSection = sliderSection;
    this.slider = sliderSection.querySelector<HTMLElement>(".slider")!;
    this.slides = sliderSection.querySelectorAll<HTMLElement>(".slide");
    this.bullets = sliderSection.querySelectorAll<HTMLElement>(".bullet");
    this.prevBtn = sliderSection.querySelector<HTMLElement>(".left");
    this.nextBtn = sliderSection.querySelector<HTMLElement>(".right");

    this.context = {
      index: 0,
      slideCount: this.slides.length,
    };

    this.init();
  }

  private init(): void {
    this.setupEventListeners();
    this.startAutoplay();
    this.handleGesture();
  }

  private setupEventListeners(): void {
    if (this.prevBtn) this.prevBtn.addEventListener("click", () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener("click", () => this.next());

    this.bullets.forEach((bullet, index) => {
      bullet.addEventListener("click", () => this.scrollToIndex(index));
    });

    this.sliderSection.addEventListener("mouseenter", () => this.stopAutoplay());
    this.sliderSection.addEventListener("mouseleave", () => this.startAutoplay());
    this.sliderSection.addEventListener("touchstart", () => this.stopAutoplay(), { passive: true });
    this.sliderSection.addEventListener("touchend", () => this.startAutoplay());
  }

  private startAutoplay(): void {
    if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
    this.autoSlideInterval = setInterval(() => this.next(), 3000);
  }

  private stopAutoplay(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  private handleGesture(): void {
    let touchStartX = 0;
    let touchEndX = 0;

    this.sliderSection.addEventListener(
      "touchstart",
      (event: TouchEvent) => {
        touchStartX = event.changedTouches[0].screenX;
      },
      { passive: true },
    );

    this.sliderSection.addEventListener("touchend", (event: TouchEvent) => {
      touchEndX = event.changedTouches[0].screenX;
      if (touchEndX < touchStartX) {
        this.next();
      }
      if (touchEndX > touchStartX) {
        this.prev();
      }
    });
  }

  private prev(): void {
    if (this.context.index > 0) {
      this.context.index--;
    } else {
      this.context.index = this.context.slideCount - 1;
    }
    this.scrollToIndex(this.context.index);
  }

  private next(): void {
    if (this.context.index < this.context.slideCount - 1) {
      this.context.index++;
    } else {
      this.context.index = 0;
    }
    this.scrollToIndex(this.context.index);
  }

  private scrollToIndex(index: number): void {
    if (index >= this.slides.length) return;
    const item = this.slides[index];
    const scrollLeft = item.offsetLeft - this.slider.offsetLeft;
    this.slider.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
    this.updateBullets(index);
  }

  private updateBullets(index: number): void {
    this.bullets.forEach((bullet, idx) => {
      if (idx === index) {
        bullet.classList.add("bullet-active");
      } else {
        bullet.classList.remove("bullet-active");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sliderSections = document.querySelectorAll<HTMLElement>(".slider-section");
  sliderSections.forEach((sliderSection) => new Slider(sliderSection));
});
