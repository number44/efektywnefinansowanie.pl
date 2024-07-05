import { Toolbar, ToolbarGroup, ToolbarButton } from "@wordpress/components";
import { settings } from "@wordpress/icons";
import { BlockControls } from "@wordpress/block-editor";
interface PropsI {
  onClick: () => void;
}
function MyToolbar({ onClick }: PropsI) {
  return (
    <BlockControls>
      <ToolbarButton onClick={onClick} icon={settings} label="Paragraph" />
    </BlockControls>
  );
}

export default MyToolbar;
