import { InspectorControls, MediaUpload, MediaUploadCheck, PanelColorSettings, useBlockProps } from "@wordpress/block-editor";
import { AttributesI } from "./types";
import "./editor.scss";
import { CheckboxControl, Panel, PanelBody, __experimentalNumberControl as NumberControl, TextControl, RadioControl, TextareaControl, Button } from "@wordpress/components";
import { image } from "@wordpress/icons";
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
}
export default function Edit({ attributes, setAttributes }: PropsI) {
  const blockProps = useBlockProps();
  return (
    <>
      <InspectorControls>
        <Panel>
          <PanelBody title="Top Link" initialOpen={false}>
            <TextControl
              label="Link Text"
              value={attributes.toplink.text}
              onChange={(value) => setAttributes({ ...attributes, toplink: { ...attributes.toplink, text: value } })}
            />
            <TextControl
              label="Link Title"
              value={attributes.toplink.title}
              onChange={(value) => setAttributes({ ...attributes, toplink: { ...attributes.toplink, title: value } })}
              help={"if empty title will be same as link text"}
            />
            <TextControl label="Link URL" value={attributes.toplink.url} onChange={(value) => setAttributes({ ...attributes, toplink: { ...attributes.toplink, url: value } })} />
            <CheckboxControl
              checked={attributes.toplink.newTab}
              label="Open in new tab"
              onChange={(value) => setAttributes({ ...attributes, toplink: { ...attributes.toplink, newTab: value } })}
            />
          </PanelBody>
          <PanelBody title="Carousel Settings" initialOpen={false}>
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
        </Panel>
      </InspectorControls>
      <div {...blockProps}>
        <div className="panel">
          <PanelBody title="Top Link" initialOpen={false}>
            <TextControl
              label="Link Text"
              value={attributes.toplink.text}
              onChange={(value) => setAttributes({ ...attributes, toplink: { ...attributes.toplink, text: value } })}
            />
            <TextControl
              label="Link Title"
              value={attributes.toplink.title}
              onChange={(value) => setAttributes({ ...attributes, toplink: { ...attributes.toplink, title: value } })}
              help={"if empty title will be same as link text"}
            />
            <TextControl label="Link URL" value={attributes.toplink.url} onChange={(value) => setAttributes({ ...attributes, toplink: { ...attributes.toplink, url: value } })} />
            <CheckboxControl
              checked={attributes.toplink.newTab}
              label="Open in new tab"
              onChange={(value) => setAttributes({ ...attributes, toplink: { ...attributes.toplink, newTab: value } })}
            />
          </PanelBody>
          <PanelBody title="Carousel Settings" initialOpen={false}>
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
          <PanelBody initialOpen={false} title={`Reklama`}>
            <CheckboxControl
              label="Pokazuj reklamę"
              checked={attributes.advert.show}
              onChange={(value) => {
                setAttributes({ ...attributes, advert: { ...attributes.advert, show: value } });
              }}
            />
            {attributes.advert.show && (
              <RadioControl
                label="Typ Reklamy"
                selected={attributes.advert.type}
                options={[
                  { label: "HTML", value: "0" },
                  { label: "Obrazek", value: "1" },
                  { label: "Custom", value: "2" },
                ]}
                onChange={(value) => {
                  setAttributes({ ...attributes, advert: { ...attributes.advert, type: value } });
                }}
              />
            )}

            {attributes.advert.show && attributes.advert.type === "0" && (
              <>
                <TextareaControl
                  label="HTML"
                  value={attributes.advert.customHtml}
                  onChange={(value) => {
                    setAttributes({ ...attributes, advert: { ...attributes.advert, customHtml: value } });
                  }}
                />
              </>
            )}

            {attributes.advert.show && attributes.advert.type === "1" && (
              <>
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(image) => {
                      setAttributes({ ...attributes, advert: { ...attributes.advert, imgId: image.id, imgUrl: image.url } });
                    }}
                    allowedTypes={["image"]}
                    value={attributes.advert.imgId}
                    render={({ open }) => {
                      if (attributes.advert.imgId) {
                        return (
                          <img
                            onClick={open}
                            style={{ cursor: "pointer", width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
                            src={attributes.advert.imgUrl}
                            alt={attributes.advert.text}
                          />
                        );
                      } else {
                        return (
                          <Button onClick={open} icon={image}>
                            Wybierz Zdjęcie
                          </Button>
                        );
                      }
                    }}
                  />
                </MediaUploadCheck>
                <TextControl
                  label="URL"
                  value={attributes.advert.url}
                  onChange={(value) => {
                    setAttributes({ ...attributes, advert: { ...attributes.advert, url: value } });
                  }}
                />
                <TextControl
                  label="Tytuł reklamy"
                  value={attributes.advert.text}
                  onChange={(value) => {
                    attributes.advert.text = value;
                  }}
                />
              </>
            )}

            {attributes.advert.show && attributes.advert.type === "2" && (
              <div>
                <TextControl
                  label="Tag tekst"
                  value={attributes.advert.tag}
                  onChange={(value) => {
                    setAttributes({ ...attributes, advert: { ...attributes.advert, tag: value } });
                  }}
                />
                <TextControl
                  label="Tytuł reklamy"
                  value={attributes.advert.text}
                  onChange={(value) => {
                    setAttributes({ ...attributes, advert: { ...attributes.advert, text: value } });
                  }}
                />
                <TextControl
                  label="URL"
                  value={attributes.advert.url}
                  onChange={(value) => {
                    setAttributes({ ...attributes, advert: { ...attributes.advert, url: value } });
                  }}
                />

                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(image) => {
                      setAttributes({ ...attributes, advert: { ...attributes.advert, imgId: image.id, imgUrl: image.url } });
                    }}
                    allowedTypes={["image"]}
                    value={attributes.advert.imgId}
                    render={({ open }) => {
                      if (attributes.advert.imgId) {
                        return (
                          <img
                            onClick={open}
                            style={{ cursor: "pointer", width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
                            src={attributes.advert.imgUrl}
                            alt="Main Logo"
                          />
                        );
                      } else {
                        return (
                          <Button onClick={open} icon={image}>
                            Wybierz Zdjęcie
                          </Button>
                        );
                      }
                    }}
                  />
                </MediaUploadCheck>
                <PanelColorSettings
                  title="Kolor"
                  colorSettings={[
                    {
                      value: attributes.advert.color,
                      onChange: (value) => {
                        if (!value) return;
                        setAttributes({ ...attributes, advert: { ...attributes.advert, color: value } });
                      },
                      label: "Kolor",
                    },
                  ]}
                />
              </div>
            )}
          </PanelBody>
          <PanelBody title="Blue Links" initialOpen={false}></PanelBody>
        </div>
      </div>
    </>
  );
}
