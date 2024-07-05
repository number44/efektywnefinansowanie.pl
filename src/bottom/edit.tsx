import { __ } from "@wordpress/i18n";
import "./editor.scss";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { Icon, shuffle, image, settings, plus, arrowUp, arrowDown, pencil, trash } from "@wordpress/icons";
import { PanelBody, Panel, Button, TextControl, ColorPicker, RadioControl, TextareaControl, CheckboxControl, SelectControl } from "@wordpress/components";
import { InspectorControls, MediaUpload, MediaUploadCheck, PanelColorSettings, RichText, useBlockProps } from "@wordpress/block-editor";
import { AttributesI } from "./types";
import Logos from "./Components/Logos";
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
            <TextControl label="Tytuł Lg" value={attributes.title} onChange={(value) => setAttributes({ ...attributes, title: value })} />
            <div
              style={{
                boxShadow: "0 0 3px #434343",
                padding: "1rem",
                borderRadius: "0.5rem",
                marginTop: "1rem",
                backgroundColor: "#fff",
              }}
            >
              <RichText label="Tytuł Sm" value={attributes.titleSm} onChange={(value) => setAttributes({ ...attributes, titleSm: value })} />
            </div>
          </PanelBody>
        </InspectorControls>
      </Panel>
      <section {...useBlockProps()}>
        <div className="section-title-box">
          <div className="section-title">
            <h2 style={{ textAlign: "center", color: "#a80000" }} className="section-title__text">
              {" "}
              {attributes.title}{" "}
            </h2>
          </div>
        </div>
        <Logos />
      </section>
    </>
  );
}
const styles: CSSProperties = {};
