import { registerBlockType } from "@wordpress/blocks";

import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import metadata from "./block.json";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

const data: any = metadata.name;

registerBlockType(data, {
  /**
   * @see ./edit.js
   */
  edit: Edit,
});
