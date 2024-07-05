import { __ } from "@wordpress/i18n";
import "./editor.scss";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { Icon, shuffle, image, settings, plus, arrowUp, arrowDown, pencil, trash } from "@wordpress/icons";
import { PanelBody, Panel, Button, TextControl, ColorPicker, RadioControl, TextareaControl, CheckboxControl, SelectControl } from "@wordpress/components";
import { InspectorControls, MediaUpload, MediaUploadCheck, PanelColorSettings, RichText, useBlockProps } from "@wordpress/block-editor";
import { AttributesI, PostI, PostRandomI } from "./types";
import apiFetch from "@wordpress/api-fetch";
import Adverts from "./Components/Adverts";
import Advert from "./Components/Advert";
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
}
export default function Edit({ setAttributes, isSelected, attributes }: PropsI) {
  const [categoryOptions, setCategoryOptions] = useState<OptionI[]>([]);
  const [posts, setPosts] = useState<PostRandomI[]>([]);
  useEffect(() => {
    apiFetch({ path: "/wp/v2/categories?per_page=100" }).then((data) => {
      const cats: CategoryI[] = data as CategoryI[];
      setCategoryOptions(
        cats.map((item: CategoryI) => ({
          label: item.name,
          value: item.id.toString(),
        })),
      );
    });
  }, []);

  const fetchRandomPosts = () => {
    let path = `/studiowac/v1/random-posts?categories=${attributes.categories.join(",")}&exclude=${attributes.exclude}&orderby=${attributes.orderby}`;
    console.log("path", path);
    apiFetch({ path: path }).then((data) => {
      const posts: PostRandomI[] = data as PostRandomI[];
      if (posts.length > 0) {
        setPosts(posts);
        const postsIds = posts.map((item) => item.id);
        setAttributes({ ...attributes, posts: postsIds });
      }
    });
  };
  const handleExclude = (c: string) => {
    setAttributes({
      ...attributes,
      exclude: parseInt(c),
      categories: attributes.categories.filter((item) => item !== parseInt(c)),
    });
  };
  return (
    <>
      <Panel>
        <InspectorControls>
          <PanelBody title="Wyświetl Posty" initialOpen={false}>
            <SelectControl
              value={attributes.orderby}
              onChange={(value) => setAttributes({ ...attributes, orderby: value })}
              options={[
                { value: "latest", label: "Ostatnie" },
                { value: "rand", label: "Losowo" },
              ]}
            />
            <Button variant="secondary" style={{ width: "100%" }} onClick={fetchRandomPosts}>
              Pobierz
            </Button>
          </PanelBody>
          <PanelBody initialOpen={false} title="Carousel">
            <CheckboxControl label="Pokazuj karuzelę" checked={attributes.showCarousel} onChange={(value) => setAttributes({ ...attributes, showCarousel: value })} />
          </PanelBody>
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
          <PanelBody title="Kategorie" initialOpen={false}>
            {categoryOptions.length > 0 &&
              categoryOptions
                .filter((cat) => cat.value !== attributes.exclude.toFixed())
                .map((cat, index) => (
                  <CheckboxControl
                    label={cat.label}
                    key={index}
                    checked={attributes.categories.includes(parseInt(cat.value))}
                    value={attributes.categories.find((item) => item === parseInt(cat.value))}
                    onChange={(value) => {
                      if (value) {
                        setAttributes({
                          ...attributes,
                          categories: [...attributes.categories, parseInt(cat.value)],
                        });
                      } else {
                        setAttributes({
                          ...attributes,
                          categories: attributes.categories.filter((item) => item !== parseInt(cat.value)),
                        });
                      }
                    }}
                  />
                ))}
            <SelectControl
              label="Wyklucz Kategorię"
              onBlur={function noRefCheck() {}}
              onChange={(value) => handleExclude(value)}
              onFocus={function noRefCheck() {}}
              options={categoryOptions}
              value={attributes.exclude.toString()}
            />
          </PanelBody>
          <PanelBody title="Reklamy Boczne" initialOpen={false}>
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
                            {"Wybierz obraz"}
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
          <div style={{ "--color": attributes.titleColor } as CSSProperties} className="section-title">
            <h2 className="section-title__text"> {attributes.title} </h2>
          </div>
        </div>
      </section>
    </>
  );
}
const styles: CSSProperties = {};
