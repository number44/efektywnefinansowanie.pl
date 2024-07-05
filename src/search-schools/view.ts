/**
 * WordPress dependencies
 */
import { store, getContext } from "@wordpress/interactivity";

store("ds-footer", {
  actions: {
    toggle: () => {
      const context: ContextI = getContext();
      context.isOpen = !context.isOpen;
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
