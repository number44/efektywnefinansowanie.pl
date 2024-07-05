/**
 * WordPress dependencies
 */
import { store, getContext } from "@wordpress/interactivity";

store("studiowac-article", {
  actions: {
    toggle: () => {
      const context: ContextI = getContext();
      context.isOpen = !context.isOpen;
    },
    openDialog: () => {
      const dialog = document.querySelector("dialog");
      if (!dialog) return;
      dialog.showModal();
    },
    closeDialog: (e: MouseEvent) => {
      const dialog = document.querySelector("dialog");
      if (!dialog) return;
      const dialogContext = document.querySelector(".loaded");
      if (!dialogContext) return;
      const target: HTMLElement | null = e.target as HTMLElement;
      if (!target) return;
      if (target.classList.contains("dialog-image")) {
        dialog.close();
      }
      console.log("dialog context", dialogContext);
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
  isOpen: boolean;
}

function dialogFoo() {
  const lightbox: HTMLDivElement | null = document.querySelector(".lightbox");
  const dialog: HTMLDialogElement | null = document.querySelector("dialog");
  const closeDialog: HTMLDivElement | null = document.querySelector(".close-dialog");
  const dialogScript = () => {
    if (!lightbox) return;
    lightbox.addEventListener("click", handleDialog);
    if (!dialog) return;
    dialog.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      console.log(target);
      if (target.classList.contains("dialog-article")) {
        dialog.close();
      }
      return;
    });
  };
  function handleDialog() {
    if (!dialog) return;

    dialog.showModal();
    if (closeDialog) {
      closeDialog.addEventListener("click", () => {
        dialog.close();
      });
    }
  }
}
