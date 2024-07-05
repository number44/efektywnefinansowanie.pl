import { useAutoAnimate } from "@formkit/auto-animate/react";

import { AttributesI, MediaCategoryI } from "src/types";
import { Flex, Button, ButtonGroup, TabPanel } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import { useCallback, useEffect, useMemo, useState } from "react";
import useMediaCategories from "../../hooks/useMediaCategories";
import useWpMedia from "../../hooks/useWpMedia";
import { plus, Icon } from "@wordpress/icons";
import MediaCategoryButton from "./MediaCategoryButton";
import Thumbnail from "./Thumbnail";
import MediaList from "./MediaList";
export default function Media({ categoryId, attributes, setAttributes, isSelected, closeModal }: PropsI) {
  const { mediaCategories } = useMediaCategories();
  const handleCategorySelect = (id: number) => {
    setAttributes({
      ...attributes,
      categories: attributes.categories.map((category) => (category.id === categoryId ? { ...category, category_id: id } : category)),
    });
  };

  const { media } = useWpMedia();
  useEffect(() => {
    console.log("media", media);
  }, [media]);

  const [selectedMediaIds, setSelectedMediaIds] = useState<number[]>([]);
  const handleMediaSelect = (id: number) => {
    const isThere = selectedMediaIds.find((mediaId) => mediaId === id);
    if (isThere) {
      setSelectedMediaIds(selectedMediaIds.filter((mediaId) => mediaId !== id));
    } else {
      setSelectedMediaIds([...selectedMediaIds, id]);
    }
  };
  const callFoo = useCallback(
    (id: number | null) => {
      if (id) {
        return media.filter((media) => media.category_id === id);
      } else {
        return media;
      }
    },
    [media],
  );

  const filteredMedia = useMemo(() => {
    return media;
  }, [media, attributes.categories]);
  return (
    <div style={{ display: "grid", gridTemplateRows: "1fr auto", height: "100%", position: "relative" }}>
      <div
        className="px py"
        style={{ maxHeight: "100%", paddingBlock: "1rem", overflowY: "auto", position: "relative", display: "grid", gap: "1rem" }}
      >
        <div>
          <div style={{ display: "flex", gap: "1rem" }}>
            {mediaCategories.map((category) => (
              <MediaCategoryButton
                isSelected={categoryId === category.id}
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                category={category}
              />
            ))}
          </div>
          <div></div>
        </div>
      </div>
      <div className="px py shadow">
        <Button style={{ width: "100%", display: "inline-block" }} variant="primary">
          Zamknij
        </Button>
      </div>
    </div>
  );
}

interface PropsI {
  closeModal: () => void;
  categoryId: number;
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
}
