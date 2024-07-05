import { AttributesI } from "../../ds-header/types";
import { Modal } from "@wordpress/components";
import { useState } from "react";
import { Icon, settings } from "@wordpress/icons";
import { TextControl } from "@wordpress/components";
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  link: LinkI;
}
const LinkItem = ({ link, attributes, setAttributes }: PropsI) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      {isModalOpen && (
        <Modal icon={settings} onRequestClose={closeModal}>
          <TextControl
            label="Text"
            value={link.text}
            onChange={(value) => {
              setAttributes({
                ...attributes,
                links: attributes.links.map((l) =>
                  l.id === link.id ? { ...l, text: value } : l
                ),
              });
            }}
          />
          <TextControl
            label="Title"
            value={link.title}
            onChange={(value) => {
              setAttributes({
                ...attributes,
                links: attributes.links.map((l) =>
                  l.id === link.id ? { ...l, title: value } : l
                ),
              });
            }}
          />
        </Modal>
      )}
      <div>
        <h1>{link.text}</h1>
      </div>
    </>
  );
};

export default LinkItem;
