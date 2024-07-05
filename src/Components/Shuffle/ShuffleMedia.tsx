import { Icon, arrowUp, arrowDown } from "@wordpress/icons";
import {
  Flex,
  Button,
  Card,
  CardMedia,
  CardBody,
  CardHeader,
} from "@wordpress/components";
import { useState } from "react";
interface PropsI {
  media: MediaI;
  onUp: (id: number) => void;
  onDown: (id: number) => void;
}
const MediaCard = ({ media, onUp, onDown }: PropsI) => {
  return (
    <Card>
      <CardHeader>
        <Flex justify="flex-end">
          <Button variant="secondary" onClick={() => onUp(media.id)}>
            <Icon icon={arrowUp} />
          </Button>
          <Button variant="secondary" onClick={() => onDown(media.id)}>
            <Icon icon={arrowDown} />
          </Button>
        </Flex>
      </CardHeader>
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
