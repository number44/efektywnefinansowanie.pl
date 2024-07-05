import { useBlockProps } from "@wordpress/block-editor";
import { AttributesI } from "./types";
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
}
import { useState } from "react";
import AccordionBox from "./Components/AccordionBox";
import { Button } from "@wordpress/components";
export default function Edit({ attributes, setAttributes, isSelected }: PropsI) {
  const blockProps = useBlockProps();
  return (
    <>
      <div {...blockProps}>
        <div className="accordion-box accordion-blue">
          {attributes.accordions.map((box, index) => (
            <AccordionBox key={index} id={index} title={box.title} content={box.content} attributes={attributes} setAttributes={setAttributes} />
          ))}
        </div>
        {isSelected && (
          <Button
            onClick={() => setAttributes({ accordions: [...attributes.accordions, { title: "Tytuł", content: "Zawartość" }] })}
            variant="secondary"
            style={{ width: "100%", display: "block" }}
          >
            +
          </Button>
        )}
      </div>
    </>
  );
}
