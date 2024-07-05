import { __ } from "@wordpress/i18n";
import "./editor.scss";
import { AttributesI } from "./types";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { Icon, shuffle, image, settings, plus, arrowUp, arrowDown, pencil, trash } from "@wordpress/icons";
import { PanelBody, Panel } from "@wordpress/components";
import { InspectorControls, MediaUpload, MediaUploadCheck, PanelColorSettings, RichText, useBlockProps } from "@wordpress/block-editor";
import LinkList from "../Components/LinkList/LinkList";
import Logo from "../Components/Icons/Logo";
import Hamburger from "../Components/Icons/Hamburger";
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
}
export default function Edit({ setAttributes, isSelected, attributes }: PropsI) {
  useEffect(() => {
    console.log("attributes", attributes);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const addLink = () => {
    setAttributes({
      ...attributes,
      links: [...attributes.links, { url: "#", text: "link text", title: "link title", order: 0, id: 0 }],
    });
  };
  const deleteLink = (id: number) => {
    console.log("id", id);
  };
  return (
    <>
      <Panel>
        <InspectorControls>
          <PanelBody title="Linki">
            <LinkList attributes={attributes} setAttributes={setAttributes} />
          </PanelBody>
        </InspectorControls>
      </Panel>
      <section {...useBlockProps()}>
        <Logo />
        <Hamburger />
      </section>
    </>
  );
}
const styles: CSSProperties = {};
