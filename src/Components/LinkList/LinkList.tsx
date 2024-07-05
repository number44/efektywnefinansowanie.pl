import {
  DropdownMenu,
  PanelRow,
  Button,
  Modal,
  TextControl,
} from "@wordpress/components";

// import { AttributesI } from "../../ds-header/types";
interface AttributesI {
  links: LinkI[];
  [key: string]: any;
}
import {
  Icon,
  more,
  pencil,
  plus,
  arrowUp,
  arrowDown,
  trash,
  settings,
} from "@wordpress/icons";
import { useState } from "react";
import SearchCombo from "../SearchCombo";
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
}

const LinkList = ({ attributes, setAttributes }: PropsI) => {
  const [selectedLink, setSelectedLink] = useState<LinkI | null>(null);
  const deleteLink = (id: number) => {
    const newLinks = attributes.links
      .filter((link) => link.id !== id)
      .map((link, index) => ({ ...link, order: index, id: index }));
    setAttributes({ ...attributes, links: newLinks });
  };
  const addLink = () => {
    if (attributes.links.length > 0) {
      const biggestId = attributes.links.reduce(
        (prev, current) => Math.max(prev, current.id),
        -Infinity
      );
      const biggestOrder = attributes.links.reduce(
        (prev, current) => Math.max(prev, current.order),
        -Infinity
      );

      setAttributes({
        ...attributes,
        links: [
          ...attributes.links,
          {
            id: biggestId + 1,
            order: biggestOrder + 1,
            url: "#",
            text: "link text",
            title: "link title",
          },
        ],
      });
    } else {
      setAttributes({
        ...attributes,
        links: [
          ...attributes.links,
          {
            id: 0,
            order: 0,
            url: "#",
            text: "link text",
            title: "link title",
          },
        ],
      });
    }
  };
  const handleUp = (id: number) => {
    const clickedElement = attributes.links.find((link) => link.id === id);
    if (!clickedElement) return;
    if (clickedElement.order === 0) return;
    const prevElement = attributes.links.find(
      (link) => link.order === clickedElement.order - 1
    );
    if (!prevElement) return;
    const newLinks = attributes.links
      .map((link) =>
        link.id === id
          ? { ...link, order: prevElement.order }
          : link.id === prevElement.id
          ? { ...link, order: clickedElement.order }
          : link
      )
      .sort((a, b) => a.order - b.order)
      .map((link, index) => ({ ...link, order: index, id: index }));
    setAttributes({ ...attributes, links: newLinks });
  };
  const handleDown = (id: number) => {
    const clickedElement = attributes.links.find((link) => link.id === id);
    if (!clickedElement) return;
    if (clickedElement.order === attributes.links.length - 1) return;
    const nextElement = attributes.links.find(
      (link) => link.order === clickedElement.order + 1
    );
    if (!nextElement) return;
    const newLinks = attributes.links
      .map((link) =>
        link.id === id
          ? { ...link, order: nextElement.order }
          : link.id === nextElement.id
          ? { ...link, order: clickedElement.order }
          : link
      )
      .sort((a, b) => a.order - b.order)
      .map((link, index) => ({ ...link, order: index, id: index }));
    setAttributes({ ...attributes, links: newLinks });
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      {isModalOpen && (
        <Modal
          style={{
            paddingBlockEnd: "1.5rem",
            width: "min(30rem, 100%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          title="Edytuj Link"
          onRequestClose={closeModal}
        >
          {selectedLink && (
            <>
              <TextControl
                label="Text"
                value={selectedLink.text}
                onChange={(value) => {
                  setSelectedLink({ ...selectedLink, text: value });
                  const newLinks = attributes.links.map((link) => {
                    return link.id === selectedLink.id
                      ? { ...link, text: value }
                      : link;
                  });
                  setAttributes({ ...attributes, links: newLinks });
                }}
              />
              <TextControl
                label="Title"
                value={selectedLink.title}
                onChange={(value) => {
                  setSelectedLink({ ...selectedLink, title: value });
                  const newLinks = attributes.links.map((link) => {
                    return link.id === selectedLink.id
                      ? { ...link, title: value }
                      : link;
                  });
                  setAttributes({ ...attributes, links: newLinks });
                }}
              />
              <SearchCombo
                onSelect={(value) => {
                  setSelectedLink({ ...selectedLink, url: value });
                }}
                attributes={attributes}
                setAttributes={setAttributes}
                link={selectedLink}
              />
            </>
          )}
        </Modal>
      )}
      {attributes.links.length > 0 && (
        <div
          style={{
            backgroundColor: "#ccc",
            padding: ".5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {attributes.links &&
            attributes.links?.length > 0 &&
            attributes.links?.map((link, index) => (
              <PanelRow key={index}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingInline: "1rem",
                    paddingBlock: ".5rem",
                    background: "#fff",
                    borderRadius: ".2rem",
                    textTransform: "uppercase",
                    filter: "drop-shadow( inset 0 0 0.1rem #4c4c4c)",
                  }}
                >
                  <div>{link.text}</div>
                  <DropdownMenu
                    controls={[
                      {
                        icon: arrowUp,
                        onClick: function noRefCheck() {
                          handleUp(link.id);
                          setSelectedLink(link);
                        },
                        title: "Przesuń link w gorę",
                      },
                      {
                        icon: arrowDown,
                        onClick: function noRefCheck() {
                          handleDown(link.id);
                          setSelectedLink(link);
                        },
                        title: "Przesuń link w dół",
                      },
                      {
                        icon: pencil,
                        onClick: function noRefCheck() {
                          setSelectedLink(link);
                          openModal();
                        },
                        title: "Edytuj",
                      },
                      {
                        icon: trash,
                        onClick: function noRefCheck() {
                          const confirmDelete = window.confirm(
                            `Czy na pewno  usunąć  link  : ${link.text}?`
                          );
                          if (!confirmDelete) return;
                          deleteLink(link.id);
                        },
                        title: "Usun",
                      },
                    ]}
                    icon={settings}
                    label="Opcjes."
                    onToggle={function noRefCheck() {}}
                  />
                </div>
              </PanelRow>
            ))}
        </div>
      )}
      <PanelRow>
        <Button
          variant="secondary"
          onClick={addLink}
          icon={plus}
          label="Settings"
          size="default"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            textTransform: "uppercase",
          }}
        ></Button>
      </PanelRow>
    </>
  );
};

export default LinkList;
