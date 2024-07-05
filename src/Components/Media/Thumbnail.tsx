import { useState } from "react";
import { MediaI, WpMediaI } from "src/types";

interface PropsI {
  media: MediaI;
  onClick: () => void;
}
const Thumbnail = ({ media, onClick }: PropsI) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    onClick();
    setIsSelected(!isSelected);
  };
  return (
    <div onClick={handleClick} style={{ aspectRatio: "4/3" }}>
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: ".4rem",
          border: isSelected ? ".5rem solid var(--wp--preset--color--primary)" : ".5rem solid var(--wp--preset--color--tertiary)",
          transition: "border .3s ease-in-out",
        }}
        src={media.url}
        alt={media.alt}
      />
      <h1>{media.alt}</h1>
    </div>
  );
};
export default Thumbnail;
