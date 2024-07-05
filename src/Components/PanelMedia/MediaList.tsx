import { ReactNode, useRef } from "react";

import { Button, CardDivider, Card, CardHeader, CardBody, CardFooter, CardMedia, Modal, Spinner } from "@wordpress/components";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const MediaList = () => {
  const loading = useRef(true);
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent} style={{ padding: "1.5rem", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem", backgroundColor: "#ccc" }}>
      <Box>
        <Spinner />
      </Box>
    </div>
  );
};
export default MediaList;

interface PropsI {
  children: ReactNode | ReactNode[];
}

const Box = ({ children }: PropsI) => {
  return <div style={{ backgroundColor: "#fff", padding: ".5rem", minHeight: "13rem", display: "grid", placeContent: "center" }}>{children}</div>;
};
