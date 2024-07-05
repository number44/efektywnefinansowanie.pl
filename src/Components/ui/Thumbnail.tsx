import { Icon, arrowUp, arrowDown } from "@wordpress/icons";
import { Flex, Button, Card, CardMedia, CardBody, CardHeader } from "@wordpress/components";
import { useState } from "react";
import { MediaI } from "src/types";
interface PropsI {
  media: MediaI;
}
const MediaCard = ({ media }: PropsI) => {
  return (
    <Card>
      <CardMedia>
        <div
          style={{
            padding: ".3rem",
            backgroundColor: "transparent",
          }}
        >
          <div className="ds-card-media">
            <img src={media.url} alt="" />
          </div>
        </div>
      </CardMedia>
    </Card>
  );
};

export default MediaCard;
