export interface AttributesI {
  titleColor: string;
  title: string;
  titleUrl: string;
  categories: number[];
  exclude: number;
  adverts: AdvertI[];
  orderby: string;
  showCarousel: boolean;
  bottomAd: {
    show: boolean;
    newTab: boolean;
    title: string;
    url: string;
    type: string;
    customHtml: string;
    imgUrl: string;
    imgSmUrl: string;
    imgId: number;
  };
  posts: number[];
}

interface CatI {
  id: number;
  name: string;
  slug: string;
}

interface bottomAdI {
  url: string;
}
export interface PostRandomI {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  link: string;
  date: string;
  featured_image: false | string;
}
export interface PostI {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: string;
  categories: CatI[];
  bottomAd: bottomAdI;
  links: {
    url: string;
    text: string;
    title: string;
    order: number;
    id: number;
  }[];
}

export interface AdvertI {
  show: boolean;
  newTab: boolean;
  url: string;
  type: string;
  customHtml: string;
  imgUrl: string;
  imgSmUrl: string;
  imgId: number;
  color: string;
  tag: string;
  text: string;
}
