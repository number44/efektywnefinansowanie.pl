/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from "@wordpress/interactivity";

store("accordion", {
  actions: {
    toggle: () => {
      const context: ContextI = getContext();
      const { ref } = getElement();
      const panel: HTMLElement | null = ref;
      if (!panel) return;
      panel.classList.toggle("accordion__panel-open");
      const content = panel.nextElementSibling as HTMLElement | null;
      if (!content) return;
      const paragraph = content.querySelector("p");
      if (!paragraph) return;
      paragraph.innerHTML = context.item.content;
      content.style.height = context.isOpen ? "0" : "100%";
      content.classList.toggle("accordion__content-open");
      console.log("context", JSON.stringify(context.item.content, null, 2));
    },
  },
  callbacks: {
    logIsOpen: () => {
      const { isOpen }: ContextI = getContext();
      // Log the value of `isOpen` each time it changes.
      console.log(`Is open: ${isOpen}`);
    },
  },
  itemText: (item: any) => {
    console.log("item", item);
  },
});

interface ContextI {
  isOpen: boolean;
  item: any;
}
interface ItemI {
  title: string;
  content: string;
}

const accordionBoxes = document.querySelectorAll(".accordion-box") as NodeListOf<HTMLDivElement>;

const accordionScript = () => {
  if (accordionBoxes.length < 1) return;
  accordionBoxes.forEach((accordions) => {
    const accs = accordions.querySelectorAll(".accordion") as NodeListOf<HTMLDivElement>;
    if (accs.length < 1) return;
    accs.forEach((acc) => {
      accordionToggler(acc);
    });
  });
};
export default accordionScript;

function accordionToggler(accordion: HTMLDivElement) {
  const panel = accordion.querySelector(".accordion__panel") as HTMLElement;
  const content = accordion.querySelector(".accordion__content") as HTMLElement;

  if (!panel) return;
  if (!content) return;
  panel.addEventListener("click", () => {
    content.classList.toggle("accordion_content-open");
    panel.classList.toggle("accordion_panel-open");
  });
}
