interface PropsI {
  url: string;
  alt: string;
}
const Advert = ({ url, alt }: PropsI) => {
  return (
    <div style={{ padding: ".3rem", backgroundColor: "#fff", height: "14.25rem" }}>
      {url.length > 0 ? <img src={url} alt={alt} /> : <img src="https://placehold.co/600x400" alt="placeholder" />}
    </div>
  );
};

export default Advert;
