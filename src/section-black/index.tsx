import { registerBlockType } from "@wordpress/blocks";

import "./style.scss";
import "./editor.scss";

import Edit from "./edit";
import metadata from "./block.json";
const data: any = metadata;
registerBlockType(data.name, {
  /**
   * @see ./edit.js
   */
  edit: Edit,
});
