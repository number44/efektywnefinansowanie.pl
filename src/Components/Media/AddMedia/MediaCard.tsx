import { Card, CardMedia } from "@wordpress/components";
import { useState } from "react";
import { WpMediaI } from "src/types";
interface PropsI {
  media: WpMediaI;
  selectedMedia: WpMediaI[];
  toggleSelected: (media: WpMediaI) => void;
}
const MediaCard = ({ media, toggleSelected, selectedMedia }: PropsI) => {
  const handler = () => {
    toggleSelected(media);
  };
  const isSelected = () => {
    if (selectedMedia.includes(media)) {
      return true;
    }
    return false;
  };
  return (
    <Card key={media.id} onClick={handler}>
      <CardMedia>
        <div
          style={{
            padding: ".3rem",
            backgroundColor: isSelected() ? "var(--wp--preset--color--primary)" : "transparent",
          }}
        >
          <div className="ds-card-media">
            <img src={media.media_details.sizes.medium.source_url} alt="" />
          </div>
        </div>
      </CardMedia>
    </Card>
  );
};

export default MediaCard;
