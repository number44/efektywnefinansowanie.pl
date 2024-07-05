import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";
import Edit from "./edit";
import metadata from "./block.json";
import { InnerBlocks } from "@wordpress/block-editor";

const data: any = metadata.name;
registerBlockType(data, {
  edit: Edit,
  save: (props) => {
    return <InnerBlocks.Content />;
  },
});
