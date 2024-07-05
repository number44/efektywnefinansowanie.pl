export interface AttributesI {
  autoplay: AutoplayI;
  toplink: LinkI;
  advert: AdvertI;
  blueLinks: LinkI[];
  redLinks: LinkI[];
}

interface AutoplayI {
  auto: boolean;
  delay: number;
}

interface LinkI {
  text: string;
  title: string;
  url: string;
  newTab: boolean;
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
