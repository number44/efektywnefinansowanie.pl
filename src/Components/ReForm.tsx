import { AttributesI, CategoryI } from "src/types";
import { TextControl, SelectControl, ButtonGroup, Button, MenuGroup, MenuItem, MenuItemsChoice } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import { plus, image, Icon } from "@wordpress/icons";
interface PropsI {
  category: CategoryI;
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
}
import { useState, useMemo, useEffect } from "react";
import { MediaCategoryI } from "src/types";
import { BlockIcon } from "@wordpress/block-editor";

const ReForm = ({ category, attributes, setAttributes, isSelected }: PropsI) => {
  const [selectedId, setSelectedId] = useState(0);
  const selectedElement = useMemo(() => attributes.categories.find(({ id }) => id === category.id), [attributes.categories, category.id]);
  const fetchMediaCategories = async (): Promise<MediaCategoryI[]> => {
    try {
      const categories = await apiFetch({ path: "/wp/v2/media_category" });
      console.log("cat", categories);
      return categories as MediaCategoryI[];
    } catch (error) {
      console.error("Error fetching media categories:", error);
      return [];
    }
  };

  const [mediaCategories, setMediaCategories] = useState<MediaCategoryI[]>([]);

  // mapped options

  useEffect(() => {
    fetchMediaCategories().then((categories) => {
      setMediaCategories(categories);
    });
  }, []);
  /**
   * Handles the selection of a category.
   *
   * @param {number} id - The ID of the selected category.
   * @return {void} No return value.
   */
  const handleCategorySelect = (id: number) => {
    console.log("example", id);
    console.log("id", id);

    const modifiedCategories = attributes.categories.map((cat) => {
      return cat;
    });

    const selectedCategory = modifiedCategories.find((cat) => cat.id === category.id);
    console.log("selecteds", selectedCategory);
    setAttributes({ ...attributes, categories: modifiedCategories });
    setSelectedId(id);
  };
  return (
    <div
      style={{
        display: "grid",
        gap: "1.5rem",
        borderRadius: ".5rem",
        cursor: "pointer",
      }}
    >
      <p>{category.category_id}</p>
      <p>{category.name}</p>
      {selectedElement && (
        <TextControl
          help="Wpisz nazwę kategorii w polu "
          placeholder="Nazwa"
          type="text"
          label="Nazwa"
          value={selectedElement.name}
          onChange={(value) =>
            setAttributes({
              ...attributes,
              categories: attributes.categories.map((category) => (category.id === selectedElement.id ? { ...category, name: value } : category)),
            })
          }
        />
      )}

      <ButtonGroup>
        {mediaCategories &&
          mediaCategories.map((option, index) => (
            <Button key={index} onClick={() => handleCategorySelect(option.id)} icon={option.id === selectedId ? image : plus} size="small" variant={option.id === selectedId ? "primary" : "secondary"}>
              {option.name}
            </Button>
          ))}
      </ButtonGroup>
    </div>
  );
};
export default ReForm;

interface OptionsI {
  label: string;
  value: number;
}
