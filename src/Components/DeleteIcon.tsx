import React from "react";
import { tableRowDelete, Icon, more, plus, arrowLeft, arrowRight, arrowUp, arrowDown } from "@wordpress/icons";

// Define the props type
interface PropsI {
  onClick?: () => void; // Optional onClick handler
}

const DeleteIcon: React.FC<PropsI> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        border: "solid 1px rgba(0, 0, 0, 0.8)",
        display: "grid",
        borderRadius: ".1rem",
        placeContent: "center",
        cursor: "pointer",
      }}
    >
      <Icon icon={tableRowDelete} />
    </div>
  );
};

export default DeleteIcon;
