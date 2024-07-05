import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from "@wordpress/block-editor";

import "./editor.scss";
import { AttributesI } from "./types";
import { Button, Panel, PanelBody, TextControl, __experimentalNumberControl as NumberControl, CheckboxControl } from "@wordpress/components";
import { image } from "@wordpress/icons";
import { useEffect, useState } from "react";
import apiFetch from "@wordpress/api-fetch";

interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
}
export default function Edit({ attributes, setAttributes, isSelected }: PropsI) {
  const [carouselItems, setCarouselItems] = useState<CarouselItemI[]>([]);
  useEffect(() => {
    apiFetch({
      path: "/studiowac/v1/carousel",
      method: "GET",
    }).then((data) => {
      console.log(data);
      setCarouselItems(data as CarouselItemI[]);
      console.log("carouselItems", carouselItems);
    });
  }, []);
  return (
    <>
      <Panel>
        <InspectorControls>
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
        </InspectorControls>
      </Panel>
      <section {...useBlockProps()}>
        {carouselItems.length < 1 ? (
          <img className="carousel-image" src="https://placehold.co/600x400" alt="" />
        ) : (
          <img className="carousel-image" src={carouselItems[0].imgUrl} alt="" />
        )}
        {/* <img className="carousel-image" src={carouselItems[0].imgUrl ? carouselItems[0].imgUrl : "https://placehold.co/600x400"} alt="" /> */}
        <div className="section-posts" style={{ display: "none" }}>
          {carouselItems.length > 0
            ? carouselItems.map((item) => (
                <div key={item.id} className="stack">
                  <img src={item.imgUrl} alt={item.title} />
                  <p className="title">{item.title}</p>
                </div>
              ))
            : null}
        </div>
      </section>
    </>
  );
}
interface CarouselItemI {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  color: string;
  url: string;
  newTab: boolean;
  imgUrl: string;
  imgSmUrl: string;
}
