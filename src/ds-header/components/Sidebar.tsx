import apiFetch from "@wordpress/api-fetch";
import { Button, Panel, PanelBody, PanelRow } from "@wordpress/components";
import { headingLevel1, plus } from "@wordpress/icons";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [slides, setSlides] = useState<SlideI[]>([]);
  const fetchSlides = () => {
    apiFetch({ path: "/studiowac/v1/carousel" }).then((s) => {
      const slides: SlideI[] = s as SlideI[];
      console.log("slides", slides);
      setSlides(slides);
    });
  };

  useEffect(() => {
    fetchSlides();
  }, []);
  const addSlide = () => {
    apiFetch({
      path: "/studiowac/v1/carousel",
      method: "POST",
      data: {
        title: "carousel asdasd",
        subtitle: "carousel subtitle",
        tag: "carousel tag",
        color: "#bb0b00",
        url: "#",
        newTab: false,
        imgUrl: "https://placehold.co/1920x1080",
        imgSmUrl: "https://placehold.co/192x108",
      },
    })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        fetchSlides();
      });
  };
  return (
    <>
      <Panel>
        <PanelBody title="Karuzela">
          {slides?.map((slide) => <h1 key={slide.id}> TEXT : {slide.text}</h1>)}
          <PanelRow>
            <Button
              onClick={addSlide}
              style={{ width: "100%", display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center" }}
              variant="secondary"
              icon={plus}
            ></Button>
          </PanelRow>
        </PanelBody>
      </Panel>
    </>
  );
};
export default Sidebar;

interface SlideI {
  id: number;
  text: string;
  subtext: string;
  newTab: boolean;
  url: string;
  imgId: number;
  imgUrl: string;
  imgSmUrl: string;
  title: string;
  alt: string;
}
