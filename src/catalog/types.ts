export interface AttributesI {
  heading: HeadingI;
  links: ImageLinkI[];
  autoplay: AutoplayI;
}

interface HeadingI {
  text: string;
  newTab: boolean;
  url: string;
  title: string;
  alt: string;
}

interface ImageLinkI {
  id: number;
  url: string;
  text: string;
  textSm: string;
  title: string;
  alt: string;
  imgId: number;
  imgUrl: string;
  imgSmUrl: string;
}
interface AutoplayI {
  auto: boolean;
  delay: number;
}
