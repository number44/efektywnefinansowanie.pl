import { AdvertI, AttributesI } from "../types";

interface PropsI {
  adNr: number;
  advert: AdvertI;
}
const Advert = ({ adNr, advert }: PropsI) => {
  return <h1>Advert - {adNr}</h1>;
};
export default Advert;
