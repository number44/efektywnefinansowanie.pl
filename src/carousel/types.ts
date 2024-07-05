export interface AttributesI {
  autoplay: AutoplayI;
  slides: SlideI[];
}
interface AutoplayI {
  auto: boolean;
  delay: number;
}
interface SlideI {
  id: number;
  text: string;
  subtext: string;
  newTab: boolean;
  url: string;
  imgId: number;
  imgUrl: string;
  imgSmUrl: string;
  title: string;
  alt: string;
}
