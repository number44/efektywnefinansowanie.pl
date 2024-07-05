import { MediaI } from "src/types";
import ShuffleMedia from "./ShuffleMedia";
import { useState } from "react";
interface PropsI {
  media: MediaI[];
  onUp: (id: number) => void;
  onDown: (id: number) => void;
}
const List = ({ media, onUp, onDown }: PropsI) => {
  const [sm, setSortedMedia] = useState<MediaI[]>(media);

  return (
    <div>
      {sm.map((image) => (
        <ShuffleMedia key={image.id} media={image} onUp={onUp} onDown={onDown} />
      ))}
    </div>
  );
};
export default List;
