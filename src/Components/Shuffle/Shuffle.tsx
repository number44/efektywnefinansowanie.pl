import { useEffect, useState, useCallback } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Button } from "@wordpress/components";
import ShuffleMedia from "./ShuffleMedia";
import List from "./List";
import { AttributesI, CategoryI, MediaI } from "src/types";

interface PropsI {
  attributes: AttributesI;
  categoryId: number;
  category: CategoryI | null;
  setAttributes: (attributes: AttributesI) => void;
}

const Shuffle = ({ attributes, setAttributes, categoryId, category }: PropsI) => {
  const [sortedMedia, setSortedMedia] = useState<MediaI[]>([]);

  const [parent] = useAutoAnimate();
  useEffect(() => {
    const sorted = [...attributes.images.filter((image) => image.category_id === category?.category_id)].sort((a, b) => a.order - b.order);
    setSortedMedia(sorted);
  }, []);

  const onUp = (id: number) => {
    const clickedElement = sortedMedia.find((image) => image.id === id);
    if (clickedElement && clickedElement.order > 0) {
      const prevElement = sortedMedia.find((image) => image.order === clickedElement.order - 1);
      if (!prevElement) return;

      const newImages = sortedMedia.map((image) =>
        image.id === id ? { ...image, order: prevElement.order } : image.id === prevElement.id ? { ...image, order: clickedElement.order } : image,
      );
      const filteredAttrMedia = attributes.images.filter((image) => image.category_id !== category?.category_id);

      setSortedMedia([...newImages]);
      setAttributes({ ...attributes, images: [...newImages, ...filteredAttrMedia] });
    }
  };

  const onDown = (id: number) => {
    const clickedElement = sortedMedia.find((image) => image.id === id);
    if (clickedElement && clickedElement.order < sortedMedia.length - 1) {
      const nextElement = sortedMedia.find((image) => image.order === clickedElement.order + 1);
      if (!nextElement) return;

      const newImages = sortedMedia.map((image) =>
        image.id === id ? { ...image, order: nextElement.order } : image.id === nextElement.id ? { ...image, order: clickedElement.order } : image,
      );
      const filteredAttrMedia = attributes.images.filter((image) => image.category_id !== category?.category_id);

      setSortedMedia([...newImages]);
      setAttributes({ ...attributes, images: [...newImages, ...filteredAttrMedia] });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingBottom: "1.5rem" }} ref={parent}>
      {sortedMedia.map((image, index) => (
        <ShuffleMedia key={index} media={image} onUp={onUp} onDown={onDown} />
      ))}
    </div>
  );
};

export default Shuffle;
