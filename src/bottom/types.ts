import { title } from "@wordpress/icons";

export interface AttributesI {
  title: string;
  titleSm: string;
  titleUrl: string;
}

export interface LogoI {
  id: number;
  title: string;
  alt: string;
  url: string;
  newTab: boolean;
  imgUrl: string;
  imgSmUrl: string;
}
