import { PanelBody, DropdownMenu, Panel, PanelRow, TextControl, Button, CardDivider, Card, CardHeader, CardBody, CardFooter, CardMedia, Modal, Spinner } from "@wordpress/components";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { PluginSidebar, PluginSidebarMoreMenuItem } from "@wordpress/edit-post";
import { image, Icon } from "@wordpress/icons";
import { useEffect, useRef, useState } from "react";
import { BlockIcon } from "@wordpress/block-editor";
import apiFetch from "@wordpress/api-fetch";
import MediaList from "./MediaList";
import { MediaCategoryI } from "src/types";

function ExampleCard() {
  return (
    <Card>
      <CardBody>
        <p>Card Content</p>
      </CardBody>
      <CardMedia>
        <img src="https://source.unsplash.com/random" alt="" />
      </CardMedia>
    </Card>
  );
}

const PluginSidebarMediaCategory = () => {
  const loading = useRef(true);
  const [parent] = useAutoAnimate();

  const [mediaCategories, setMediaCategories] = useState<MediaCategoryI[]>([]);
  useEffect(() => {
    loading.current = true;
    apiFetch({ path: "/wp/v2/media_category" })
      .then((categories) => {
        const cats = categories as MediaCategoryI[];
        console.log("cat $", categories);
        if (cats && cats.length === 0) return;
        setMediaCategories(categories as MediaCategoryI[]);
      })

      .finally(() => {
        loading.current = false;
      })
      .catch((error) => console.error(error));
  }, []);

  const element = useRef<HTMLElement>(null);
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <>
      {isOpen && (
        <Modal title="This is my modal" onRequestClose={closeModal} isFullScreen={true}>
          <MediaList />
          <Button variant="secondary" onClick={closeModal}>
            My custom close button
          </Button>
        </Modal>
      )}
      <PluginSidebar title="Media Categories" name="sidebar-name" icon={image} isPinnable={true}>
        <PanelBody initialOpen={true} title="Media Categories">
          <Button icon={image} style={{ width: "100%", justifyContent: "center", gap: "1rem" }} variant="secondary" type="button" onClick={() => openModal()}>
            Galeria
          </Button>
        </PanelBody>

        <PanelRow>ssas</PanelRow>
      </PluginSidebar>
    </>
  );
};
export default PluginSidebarMediaCategory;

const Header = () => {
  return <h1 dangerouslySetInnerHTML={{ __html: "<h1>wwwwwwwwwwwww</h1>" }}></h1>;
};
