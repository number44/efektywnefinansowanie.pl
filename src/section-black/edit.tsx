import { __ } from "@wordpress/i18n";
import "./editor.scss";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { Icon, shuffle, image, settings, plus, arrowUp, arrowDown, pencil, trash } from "@wordpress/icons";
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
  CheckboxControl,
  TextareaControl,
  RadioControl,
} from "@wordpress/components";
import { InspectorControls, MediaUpload, MediaUploadCheck, PanelColorSettings, RichText, useBlockProps } from "@wordpress/block-editor";
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
import { AttributesI } from "./types";
import Adverts from "./Components/Adverts";
import Advert from "./Components/Advert";
import Image from "./Components/Advert";
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
}
export default function Edit({ setAttributes, isSelected, attributes }: PropsI) {
  return (
    <>
      <Panel>
        <InspectorControls>
          <PanelBody initialOpen={false} title="Tytuł">
            <TextControl label="Tytuł" value={attributes.title} onChange={(value) => setAttributes({ ...attributes, title: value })} />
            <TextControl label="Adres URL Tytułu" value={attributes.titleUrl} onChange={(value) => setAttributes({ ...attributes, titleUrl: value })} />
            <PanelColorSettings
              title="Kolor"
              colorSettings={[
                {
                  value: attributes.titleColor,
                  onChange: (value) =>
                    setAttributes({
                      ...attributes,
                      titleColor: value ? value : attributes.titleColor,
                    }),
                  label: "Kolor tytułu",
                },
              ]}
            />
          </PanelBody>
          <PanelBody title="Reklamy" initialOpen={false}>
            <Adverts attributes={attributes} setAttributes={setAttributes} />
          </PanelBody>
          <PanelBody title="Reklama Dolna" initialOpen={false}>
            <CheckboxControl
              label="Pokazuj reklamę"
              checked={attributes.bottomAd.show}
              onChange={(value) =>
                setAttributes({
                  ...attributes,
                  bottomAd: { ...attributes.bottomAd, show: value },
                })
              }
            />
            {attributes.bottomAd.show && (
              <RadioControl
                label="Typ Reklamy Dolnej"
                selected={attributes.bottomAd.type}
                options={[
                  { label: "HTML", value: "0" },
                  { label: "Obrazek", value: "1" },
                ]}
                onChange={(value) =>
                  setAttributes({
                    ...attributes,
                    bottomAd: { ...attributes.bottomAd, type: value },
                  })
                }
              />
            )}
            {attributes.bottomAd.show && attributes.bottomAd.type === "0" && (
              <TextareaControl
                label="HTML"
                value={attributes.bottomAd.customHtml}
                onChange={(value) =>
                  setAttributes({
                    ...attributes,
                    bottomAd: { ...attributes.bottomAd, customHtml: value },
                  })
                }
              />
            )}
            {attributes.bottomAd.show && attributes.bottomAd.type === "1" && (
              <>
                <MediaUploadCheck>
                  <MediaUpload
                    value={attributes.bottomAd.imgId}
                    onSelect={(media) => {
                      setAttributes({
                        ...attributes,
                        bottomAd: {
                          ...attributes.bottomAd,
                          imgUrl: media.sizes.full.url,
                          imgSmUrl: media.sizes.thumbnail.url,
                          imgId: media.id,
                        },
                      });
                    }}
                    allowedTypes={["image"]}
                    render={({ open }) => {
                      if (attributes.bottomAd.imgId) {
                        return (
                          <img
                            className="panel-img"
                            onClick={open}
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              aspectRatio: "16/9",
                              objectFit: "cover",
                            }}
                            src={attributes.bottomAd.imgUrl}
                            alt="Main Logo"
                          />
                        );
                      } else {
                        return (
                          <Button onClick={open} className="components-panel__body__toggle" icon={image}>
                            {__("Wybierz obraz")}
                          </Button>
                        );
                      }
                    }}
                  />
                </MediaUploadCheck>
                <TextControl
                  label="URL"
                  value={attributes.bottomAd.url}
                  onChange={(value) =>
                    setAttributes({
                      ...attributes,
                      bottomAd: { ...attributes.bottomAd, url: value },
                    })
                  }
                />
                <TextControl
                  label="Tytuł"
                  value={attributes.bottomAd.title}
                  onChange={(value) => {
                    setAttributes({
                      ...attributes,
                      bottomAd: { ...attributes.bottomAd, title: value },
                    });
                  }}
                />

                <CheckboxControl
                  label="Otwór link w nowym oknie"
                  checked={attributes.bottomAd.newTab}
                  onChange={(value) =>
                    setAttributes({
                      ...attributes,
                      bottomAd: { ...attributes.bottomAd, newTab: value },
                    })
                  }
                />
              </>
            )}
          </PanelBody>
        </InspectorControls>
      </Panel>
      <section {...useBlockProps()}>
        <div className="section-title-box" style={{ "--color": attributes.titleColor } as CSSProperties}>
          <a style={{ "--color": attributes.titleColor } as CSSProperties} href="#" title={attributes.title} className="section-title">
            <h2 className="section-title__text"> {attributes.title} </h2>
          </a>
        </div>
        <div className="section-posts">
          {attributes.adverts.map((item, index) => (
            <Advert alt={item.text} url={item.imgUrl} key={index} />
          ))}
        </div>
        <div style={{ maxWidth: "60rem", marginInline: "auto", marginBlock: "2rem" }}>
          <Advert alt={attributes.bottomAd.title} url={attributes.bottomAd.imgUrl} />
        </div>
      </section>
    </>
  );
}
const styles: CSSProperties = {};
