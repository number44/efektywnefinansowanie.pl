import { registerBlockType } from "@wordpress/blocks";

import "./style.scss";
import "./editor.scss";
import Edit from "./edit";
import metadata from "./block.json";
const data: any = metadata;
registerBlockType(data.name, {
  edit: Edit,
});
import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebar } from "@wordpress/edit-post";
import { gallery } from "@wordpress/icons";
import Sidebar from "./components/Sidebar";

const PluginSidebarTest = () => (
  <PluginSidebar name="plugin-sidebar-test" title="My Plugin" icon={gallery}>
    <Sidebar />
  </PluginSidebar>
);

registerPlugin("plugin-sidebar-test", { render: PluginSidebarTest });
