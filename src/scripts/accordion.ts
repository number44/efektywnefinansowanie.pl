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
