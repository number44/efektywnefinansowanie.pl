import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from "react";
import { WpMediaI } from "src/types";
interface MediaI {
  id: number;
  category_id: number;
  alt: string;
  url: string;
}
interface PropsI {
  mediaCategoryId?: number;
}
const useWpMedia = (mediaCategoryId?: number) => {
  const [media, setMedia] = useState<MediaI[]>([]);
  const fetchMedia = async (): Promise<WpMediaI[]> => {
    try {
      const media = (await apiFetch({ path: "/wp/v2/media" })) as WpMediaI[];
      console.log("cat", media);
      return media as WpMediaI[];
    } catch (error) {
      console.error("Error fetching media categories:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchMedia().then((categories) => {
      const mappedMedia = categories.map((media: WpMediaI) => {
        return {
          id: media.id,
          alt: media.alt_text,
          url: media.media_details.sizes.medium.source_url,
          category_id: media.media_category[0],
        } as MediaI;
      });
      setMedia(mappedMedia);
    });
  }, []);

  return { media };
};

export default useWpMedia;
