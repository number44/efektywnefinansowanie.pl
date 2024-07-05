import { AttributesI, CategoryI, MediaCategoryI } from "src/types";
import { plus, image } from "@wordpress/icons";
import { TextControl, ButtonGroup, Button } from "@wordpress/components";
import { useEffect, useState } from "react";
import apiFetch from "@wordpress/api-fetch";
const Settings = ({ categoryId, attributes, setAttributes, isSelected }: PropsI) => {
  const selectedCategory = attributes.categories.find((category) => category.id === categoryId);
  const [mediaCategories, setMediaCategories] = useState<MediaCategoryI[]>([]);
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

  useEffect(() => {
    fetchMediaCategories().then((categories) => {
      setMediaCategories(categories);
    });
  }, []);
  const handleCategorySelect = (id: number) => {
    setAttributes({
      ...attributes,
      categories: attributes.categories.map((category) => (category.id === categoryId ? { ...category, category_id: id } : category)),
    });
  };
  if (!selectedCategory) return null;
  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <h1>{selectedCategory?.name}</h1>
      <TextControl
        help="Wpisz nazwę kategorii w polu "
        placeholder="Nazwa"
        type="text"
        label="Nazwa"
        value={selectedCategory.name}
        onChange={(value) =>
          setAttributes({
            ...attributes,
            categories: attributes.categories.map((category) => (category.id === selectedCategory.id ? { ...category, name: value } : category)),
          })
        }
      />
      <ButtonGroup>
        {mediaCategories ? (
          mediaCategories.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleCategorySelect(option.id)}
              icon={option.id === selectedCategory.category_id ? image : plus}
              size="small"
              variant={option.id === selectedCategory.category_id ? "primary" : "secondary"}
            >
              {option.name}
            </Button>
          ))
        ) : (
          <Button variant="secondary" href="">
            {" "}
            Brak kategorii{" "}
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};
export default Settings;
interface PropsI {
  categoryId: number;
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  isSelected: boolean;
}
