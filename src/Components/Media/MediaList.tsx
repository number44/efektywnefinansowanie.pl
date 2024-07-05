import { WpMediaI } from "src/types";
import Thumbnail from "./Thumbnail";
import { useState } from "react";
interface PropsI {
  media: WpMediaI[];
}
const MediaList = ({ media }: PropsI) => {
  const [isSelected, setIsSelected] = useState(false);
  return <div>{media?.map((media) => <Thumbnail onClick={() => setIsSelected(!isSelected)} key={media.id} media={media} />)}</div>;
};
export default MediaList;
