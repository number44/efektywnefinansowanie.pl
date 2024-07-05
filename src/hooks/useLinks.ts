import { useState, useEffect } from "react";
import { AttributesI } from "../ds-header/types";

export const useLinks = (
  attributes: AttributesI,
  setAttributes: (attributes: AttributesI) => void
) => {
  const [sortedCategories, setSortedCategories] = useState<CategoryI[]>([]);

  useEffect(() => {
    const sorted = attributes.categories.sort((a, b) => a.order - b.order);
    setSortedCategories(sorted);
  }, [attributes.categories]);

  const addCategory = () => {
    const biggestId = attributes.categories.reduce(
      (prev, current) => Math.max(prev, current.id),
      -Infinity
    );
    const biggestOrder = attributes.categories.reduce(
      (prev, current) => Math.max(prev, current.order),
      -Infinity
    );

    setAttributes({
      ...attributes,
      categories: [
        ...attributes.categories,
        {
          id: biggestId + 1,
          name: "Empty",
          order: biggestOrder + 1,
          category_id: 0,
        },
      ],
    });
  };

  const handleUp = (id: number) => {
    const clickedElement = attributes.categories.find(
      (category) => category.id === id
    );
    if (clickedElement && clickedElement.order > 0) {
      const prevElement = attributes.categories.find(
        (category) => category.order === clickedElement.order - 1
      );
      if (!prevElement) return;
      const newCategories = sortedCategories.map((category) =>
        category.id === id
          ? { ...category, order: prevElement.order }
          : category.id === prevElement.id
          ? { ...category, order: clickedElement.order }
          : category
      );
      setAttributes({ ...attributes, categories: newCategories });
    }
  };

  const handleDown = (id: number) => {
    const clickedElement = attributes.categories.find(
      (category) => category.id === id
    );
    if (!clickedElement) return;

    const nextElement = attributes.categories.find(
      (category) => category.order === clickedElement.order + 1
    );
    if (!nextElement) return;

    const newCategories = sortedCategories.map((category) =>
      category.id === id
        ? { ...category, order: nextElement.order }
        : category.id === nextElement.id
        ? { ...category, order: clickedElement.order }
        : category
    );
    setAttributes({ ...attributes, categories: newCategories });
  };

  const deleteCategory = (id: number) => {
    const newCategories = attributes.categories
      .filter((category) => category.id !== id)
      .map((category, index) => ({ ...category, order: index }));
    setAttributes({ ...attributes, categories: newCategories });
  };

  return {
    sortedCategories,
    addCategory,
    handleUp,
    handleDown,
    deleteCategory,
  };
};
