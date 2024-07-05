import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from "react";
import { CategoryI, WpMediaI, AttributesI, MediaI } from "src/types";
import { Button } from "@wordpress/components";
import MediaCard from "./MediaCard";
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  category: CategoryI | null;
  closeModal: () => void;
}

const AddMedia = ({ category, attributes, setAttributes, closeModal }: PropsI) => {
  const [mediaFiles, setMediaFiles] = useState<WpMediaI[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<WpMediaI[]>([]);

  useEffect(() => {
    console.log("cartegory", category?.id);
    apiFetch({ path: "/wp/v2/media?media_category=" + category?.category_id }).then((data) => {
      const d = data as WpMediaI[];
      console.log("data", d);
      setMediaFiles(d);
    });
  }, []);
  const toggleSelected = (sm: WpMediaI) => {
    console.log("begining sm", selectedMedia);
    if (selectedMedia.includes(sm)) {
      console.log("includes");
      const filteredMedia = selectedMedia.filter((s) => s.id !== sm.id);
      console.log("filteredMedia", filteredMedia);

      setSelectedMedia(selectedMedia.filter((s) => s.id !== sm.id));
    } else {
      console.log("not includes");
      console.log("smni", sm);
      setSelectedMedia([...selectedMedia, sm]);
    }
    console.log("sm", selectedMedia);
  };

  const createGellery = () => {
    const cId = category?.category_id;
    const mappedMedia = selectedMedia.map((sm, index) => {
      return {
        id: sm.id,
        alt: sm.alt_text,
        url: sm.media_details.sizes.medium.source_url,
        category_id: cId ? cId : 0,
        order: index,
      } as MediaI;
    });

    const filteredAttrMedia = attributes.images.filter((image) => image.category_id !== category?.category_id);

    setAttributes({ ...attributes, images: [...filteredAttrMedia, ...mappedMedia] });
    closeModal();
  };
  if (!category) return <h1>Nie wybrano zdjęć z danej kategorii</h1>;
  return (
    <div>
      <h1>
        {category.name} + {category.category_id}
      </h1>
      <div className="ds-gallery-grid">
        {mediaFiles?.map((media) => {
          return <MediaCard toggleSelected={toggleSelected} key={media.id} selectedMedia={selectedMedia} media={media} />;
        })}
      </div>
      <Button onClick={createGellery} variant="secondary" style={{ marginBlockStart: "1.5rem", width: "100%", display: "block" }}>
        Utwórz gelerię
      </Button>
    </div>
  );
};

export default AddMedia;
