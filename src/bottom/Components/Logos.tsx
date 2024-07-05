import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from "react";
import { LogoI } from "../types";

interface PropsI {
  logo: LogoI[];
}
const Logos = () => {
  const [logos, setLogos] = useState<LogoI[]>([]);
  useEffect(() => {
    apiFetch({
      path: "/studiowac/v1/logo_bronze",
      method: "GET",
    }).then((data) => {
      console.log(data);
      setLogos(data as LogoI[]);
    });
  }, []);
  if (logos.length < 1) return <h1 style={{ textAlign: "center" }}>No logos</h1>;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
        gap: "1rem",
        width: "100%",
        padding: "1.5rem",
        overflowX: "auto",
      }}
    >
      {logos.map((logo) => (
        <div key={logo.id} style={{ padding: ".5rem", backgroundColor: "#fff", boxShadow: "0 0 8px #0000000f", aspectRatio: "1/1" }}>
          <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={logo.imgUrl} alt={logo.alt} />
        </div>
      ))}
    </div>
  );
};
export default Logos;
