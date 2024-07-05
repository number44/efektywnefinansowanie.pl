import { Button, CheckboxControl, ColorPicker, PanelBody, RadioControl, TextControl, TextareaControl } from "@wordpress/components";
import { AttributesI } from "../types";
import { MediaUpload, MediaUploadCheck, PanelColorSettings } from "@wordpress/block-editor";
import { image } from "@wordpress/icons";

interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
}
const Adverts = ({ attributes, setAttributes }: PropsI) => {
  return (
    <>
      {attributes.adverts.map((item, index) => (
        <PanelBody initialOpen={false} title={`Reklama ${index + 1}`} key={index}>
          <CheckboxControl
            label="Pokazuj reklamę"
            checked={item.show}
            onChange={(value) => {
              const newAdverts = attributes.adverts.map((advert, advertIndex) => {
                if (advertIndex === index) {
                  return { ...advert, show: value };
                }
                return advert;
              });
              setAttributes({ ...attributes, adverts: newAdverts });
            }}
          />
          {item.show && (
            <RadioControl
              label="Typ Reklamy"
              selected={item.type}
              options={[
                { label: "HTML", value: "0" },
                { label: "Obrazek", value: "1" },
                { label: "Custom", value: "2" },
              ]}
              onChange={(value) => {
                const newAdverts = attributes.adverts.map((advert, advertIndex) => {
                  if (advertIndex === index) {
                    return { ...advert, type: value };
                  }
                  return advert;
                });
                setAttributes({ ...attributes, adverts: newAdverts });
              }}
            />
          )}

          {item.show && item.type === "0" && (
            <>
              <TextareaControl
                label="HTML"
                value={item.customHtml}
                onChange={(value) => {
                  const newAdverts = attributes.adverts.map((advert, advertIndex) => {
                    if (advertIndex === index) {
                      return { ...advert, customHtml: value };
                    }
                    return advert;
                  });
                  setAttributes({ ...attributes, adverts: newAdverts });
                }}
              />
            </>
          )}

          {item.show && item.type === "1" && (
            <>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(image) => {
                    const newAdverts = attributes.adverts.map((advert, advertIndex) => {
                      if (advertIndex === index) {
                        return { ...advert, imgUrl: image.url, imgId: image.id, imgSmUrl: image.sizes.thumbnail.url };
                      }
                      return advert;
                    });
                    setAttributes({ ...attributes, adverts: newAdverts });
                  }}
                  allowedTypes={["image"]}
                  value={item.imgId}
                  render={({ open }) => {
                    if (item.imgId) {
                      return <img onClick={open} style={{ cursor: "pointer", width: "100%", aspectRatio: "16/9", objectFit: "cover" }} src={item.imgUrl} alt="Main Logo" />;
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
                value={item.url}
                onChange={(value) => {
                  const newAdverts = attributes.adverts.map((advert, advertIndex) => {
                    if (advertIndex === index) {
                      return { ...advert, url: value };
                    }
                    return advert;
                  });
                  setAttributes({ ...attributes, adverts: newAdverts });
                }}
              />
              <TextControl
                label="Tytuł reklamy"
                value={item.text}
                onChange={(value) => {
                  const newAdverts = attributes.adverts.map((advert, advertIndex) => {
                    if (advertIndex === index) {
                      return { ...advert, text: value };
                    }
                    return advert;
                  });
                  setAttributes({ ...attributes, adverts: newAdverts });
                }}
              />
            </>
          )}

          {item.show && item.type === "2" && (
            <div>
              <TextControl
                label="Tag tekst"
                value={item.tag}
                onChange={(value) => {
                  const newAdverts = attributes.adverts.map((advert, advertIndex) => {
                    if (advertIndex === index) {
                      return { ...advert, tag: value };
                    }
                    return advert;
                  });
                  setAttributes({ ...attributes, adverts: newAdverts });
                }}
              />
              <TextControl
                label="Tytuł reklamy"
                value={item.text}
                onChange={(value) => {
                  const newAdverts = attributes.adverts.map((advert, advertIndex) => {
                    if (advertIndex === index) {
                      return { ...advert, text: value };
                    }
                    return advert;
                  });
                  setAttributes({ ...attributes, adverts: newAdverts });
                }}
              />
              <TextControl
                label="URL"
                value={item.url}
                onChange={(value) => {
                  const newAdverts = attributes.adverts.map((advert, advertIndex) => {
                    if (advertIndex === index) {
                      return { ...advert, url: value };
                    }
                    return advert;
                  });
                  setAttributes({ ...attributes, adverts: newAdverts });
                }}
              />

              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(image) => {
                    const newAdverts = attributes.adverts.map((advert, advertIndex) => {
                      if (advertIndex === index) {
                        return { ...advert, imgUrl: image.url, imgId: image.id, imgSmUrl: image.sizes.thumbnail.url };
                      }
                      return advert;
                    });
                    setAttributes({ ...attributes, adverts: newAdverts });
                  }}
                  allowedTypes={["image"]}
                  value={item.imgId}
                  render={({ open }) => {
                    if (item.imgId) {
                      return <img onClick={open} style={{ cursor: "pointer", width: "100%", aspectRatio: "16/9", objectFit: "cover" }} src={item.imgUrl} alt="Main Logo" />;
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
                    value: item.color,
                    onChange: (value) => {
                      const newAdverts = attributes.adverts.map((advert, advertIndex) => {
                        if (advertIndex === index) {
                          return { ...advert, color: value ? value : item.color };
                        }
                        return advert;
                      });
                      setAttributes({ ...attributes, adverts: newAdverts });
                    },
                    label: "Kolor",
                  },
                ]}
              />
            </div>
          )}
        </PanelBody>
      ))}
    </>
  );
};
export default Adverts;
