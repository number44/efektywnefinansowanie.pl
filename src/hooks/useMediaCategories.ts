import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from "react";
import { MediaCategoryI } from "src/types";

const useMediaCategories = () => {
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
  return { mediaCategories };
};

export default useMediaCategories;
