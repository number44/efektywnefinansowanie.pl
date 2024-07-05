import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from "@wordpress/block-editor";

import "./editor.scss";
import { AttributesI } from "./types";
import { Button, CheckboxControl, Panel, PanelBody, TextControl, __experimentalNumberControl as NumberControl } from "@wordpress/components";
import { image } from "@wordpress/icons";
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
}
export default function Edit({ attributes, setAttributes, isSelected }: PropsI) {
  return (
    <>
      <Panel>
        <InspectorControls>
          <PanelBody title="Nagłówek" initialOpen={false}>
            <TextControl label="text" value={attributes.heading.text} onChange={(value) => setAttributes({ ...attributes, heading: { ...attributes.heading, text: value } })} />
            <TextControl label="url" value={attributes.heading.url} onChange={(value) => setAttributes({ ...attributes, heading: { ...attributes.heading, url: value } })} />
            <TextControl label="title" value={attributes.heading.title} onChange={(value) => setAttributes({ ...attributes, heading: { ...attributes.heading, title: value } })} />
            <TextControl label="alt" value={attributes.heading.alt} onChange={(value) => setAttributes({ ...attributes, heading: { ...attributes.heading, alt: value } })} />
          </PanelBody>
          <PanelBody title="Autoplay" initialOpen={false}>
            <CheckboxControl
              checked={attributes.autoplay.auto}
              label="autoplay"
              onChange={(value) => setAttributes({ ...attributes, autoplay: { ...attributes.autoplay, auto: value } })}
            />
            <NumberControl
              label="delay"
              value={attributes.autoplay.delay}
              onChange={(value) => setAttributes({ ...attributes, autoplay: { ...attributes.autoplay, delay: value ? parseInt(value) : 0 } })}
            />
          </PanelBody>
          <PanelBody title="Linki" initialOpen={false}>
            {attributes.links.map((link, index) => (
              <PanelBody key={link.id} title={"Link" + (index + 1)}>
                <TextControl
                  label="text"
                  value={link.text}
                  onChange={(value) => {
                    setAttributes({
                      ...attributes,
                      links: attributes.links.map((l) => (l.id === link.id ? { ...l, text: value } : l)),
                    });
                  }}
                />
                <TextControl
                  label="text mobile"
                  value={link.textSm}
                  onChange={(value) => {
                    setAttributes({
                      ...attributes,
                      links: attributes.links.map((l) => (l.id === link.id ? { ...l, textSm: value } : l)),
                    });
                  }}
                />

                <TextControl
                  label="url"
                  value={link.url}
                  onChange={(value) => {
                    setAttributes({
                      ...attributes,
                      links: attributes.links.map((l) => (l.id === link.id ? { ...l, url: value } : l)),
                    });
                  }}
                />
                <MediaUploadCheck>
                  <MediaUpload
                    value={link.imgId}
                    onSelect={(media) => {
                      console.log("media :", media);
                      setAttributes({
                        ...attributes,
                        links: attributes.links.map((l) => (l.id === link.id ? { ...l, imgId: media.id, imgUrl: media.sizes.large.url, imgSmUrl: media.sizes.thumbnail.url } : l)),
                      });
                    }}
                    allowedTypes={["image"]}
                    render={({ open }) => {
                      if (link.imgId) {
                        return (
                          <img
                            onClick={open}
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              aspectRatio: "16/9",
                              objectFit: "cover",
                            }}
                            src={link.imgUrl}
                            alt="Zdjęcie linku katalogu"
                          />
                        );
                      } else {
                        return (
                          <Button onClick={open} className="components-panel__body__toggle" icon={image}>
                            {"Wybierz obraz"}
                          </Button>
                        );
                      }
                    }}
                  />
                </MediaUploadCheck>
              </PanelBody>
            ))}
          </PanelBody>
        </InspectorControls>
      </Panel>
      <section {...useBlockProps()}>
        <div className="section-title-box">
          <div title={attributes.heading.title} className="section-title">
            <h1 className="section-title__text">{attributes.heading.text}</h1>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", alignItems: "center" }}>
          {attributes.links.map((link) => (
            <div title={link.title} className="sectisson-link" style={{ display: "grid", gap: "0.5rem", color: "#434343" }} key={link.id}>
              <img src={link.imgSmUrl} alt="" />
              <p className="section-link__text">{link.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
