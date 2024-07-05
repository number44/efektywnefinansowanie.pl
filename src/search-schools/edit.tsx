import { __ } from "@wordpress/i18n";
import "./editor.scss";
import { AttributesI } from "./types";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import {
  Icon,
  shuffle,
  image,
  settings,
  plus,
  arrowUp,
  arrowDown,
  pencil,
  trash,
} from "@wordpress/icons";
import {
  PanelBody,
  DropdownMenu,
  Panel,
  PanelRow,
  Button,
  Modal,
  Flex,
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  Card,
  CardBody,
  CardHeader,
  TextControl,
} from "@wordpress/components";
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  PanelColorSettings,
  RichText,
  useBlockProps,
} from "@wordpress/block-editor";
import ArrowUp from "../Components/ArrowDown";
import ArrowDown from "../Components/ArrowDown";
import DeleteIcon from "../Components/DeleteIcon";
import ReForm from "../Components/ReForm";
import { useCategories } from "../hooks/useCategory";
import Settings from "../Components/Settings/Settings";
import Media from "../Components/Media/Media";
import AddMedia from "../Components/Media/AddMedia/AddMedia";
import Shuffle from "../Components/Shuffle/Shuffle";
import MediaCard from "../Components/Shuffle/ShuffleMedia";
import Thumbnail from "../Components/ui/Thumbnail";
import MyToolbar from "../Components/Toolbar/MyToolbar";
import LinkList from "../Components/LinkList/LinkList";
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
}
export default function Edit({
  setAttributes,
  isSelected,
  attributes,
}: PropsI) {
  useEffect(() => {
    console.log("attributes", attributes);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const addLink = () => {
    setAttributes({
      ...attributes,
      links: [
        ...attributes.links,
        { url: "#", text: "link text", title: "link title", order: 0, id: 0 },
      ],
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
      <MyToolbar onClick={openModal} />
      <section {...useBlockProps()}>
        <Flex>
          {attributes.links.map((link) => (
            <a
              key={link.id}
              data-id={link.id}
              data-order={link.order}
              href={link.url}
              title={link.title}
            >
              {link.text}
            </a>
          ))}
        </Flex>
      </section>
    </>
  );
}
const styles: CSSProperties = {};
