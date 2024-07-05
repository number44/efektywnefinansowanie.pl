/**
 * WordPress dependencies
 */

import { store, getContext, getElement } from "@wordpress/interactivity";

const { actions, callbacks } = store("ds-header", {
  actions: {
    toggle: () => {
      const context: ContextI = getContext();
      context.isOpen = !context.isOpen;
    },
    closeSearch: () => {
      const inputEl: HTMLInputElement | null = document.querySelector("#search-input");
      if (!inputEl) return;
      inputEl.value = "";
      callbacks.toggleSearch(false);
    },
    search: (e: KeyboardEvent) => {
      const context: ContextI = getContext();
      const { ref } = getElement();
      const el: HTMLInputElement | null = ref as HTMLInputElement;
      if (!el) return;

      if (e.key === "Enter") {
        el.value = "";
      }
      if (el.value.length > 4) {
        callbacks.toggleSearch(true);
        callbacks.fetchSearch(el.value);
      } else {
        callbacks.toggleSearch(false);
      }
    },
  },
  callbacks: {
    handleScroll: (e: Event) => {
      const header: HTMLElement | null = document.querySelector("header");
      if (!header) return;
      e.stopPropagation(); // Handy if you want to prevent event bubbling to scrollable parent
      let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let scrolled = (winScroll / height) * 100;
      console.log("scrolled", scrolled);
      if (winScroll > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    },
    logIsOpen: () => {
      const { isOpen }: ContextI = getContext();
      // Log the value of `isOpen` each time it changes.
    },
    toggleSearch: (bool: boolean) => {
      const context: ContextI = getContext();
      context.isSearchOpen = bool;
    },
    fetchSearch: debounce((val: string) => {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      const baseUrl = `${url.protocol}//${url.hostname}${url.port ? ":" + url.port : ""}`.trim();
      const trimmedurl: string = `${baseUrl}/wp-json/wp/v2/search?search=${encodeURIComponent(val.trim())}`;
      fetch(trimmedurl)
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
        });
    }, 300),
  },
});
interface ContextI {
  isOpen: boolean;
  isSearchOpen: boolean;
}

function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout> | null;

  return function debounced(this: unknown, ...args: Parameters<T>): void {
    clearTimeout(timerId!);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
