interface LinkI {
  id: number;
  order: number;
  url: string;
  text: string;
  title: string;
}

// Interface for the block attributes
export interface AttributesI {
  links: LinkI[];
  copyrights: string;
}

export interface CategoryI {
  id: number;
  name: string;
  order: number;
  category_id: number;
}

export interface MediaCategoryI {
  id: number;
  description: string;
  link: string;
  name: string;
  slug: string;
}

export interface WpMediaI {
  id: number;
  alt_text: string;
  media_category: number[];
  description: {
    rendered: string;
  };
  media_details: {
    sizes: {
      medium: {
        source_url: string;
      };
      full: {
        source_url: string;
      };
    };
  };
}

export interface MediaI {
  id: number;
  url: string;
  alt: string;
  category_id: number;
  order: number;
}
