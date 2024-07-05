import { MediaCategoryI } from "src/types";

interface PropsI {
  onClick: () => void;
  category: MediaCategoryI;
  isSelected: boolean;
}
const MediaCategoryButton = ({ category, onClick, isSelected }: PropsI) => {
  return (
    <div
      onClick={onClick}
      style={{
        color: "var(--wp--preset--color--primary)",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        gap: ".5rem",
        padding: ".5rem",
        boxShadow: " 0rem 0rem .1rem  var(--wp--preset--color--primary)",
        textTransform: "uppercase",
        borderRadius: ".1rem",
        width: "auto",
      }}
    >
      <EyeIcon isSelected={isSelected} />
      <span>{category.name}</span>
    </div>
  );
};

export default MediaCategoryButton;

const EyeIcon = ({ isSelected }: { isSelected: boolean }) => {
  if (isSelected) {
    return (
      <div style={{ background: "red", width: "1rem", height: "1rem", borderRadius: "50%" }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--wp--preset--color--primary)" className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      </div>
    );
  }

  return (
    <div style={{ width: "1rem", height: "1rem", borderRadius: "50%" }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--wp--preset--color--primary)" className="w-6 h-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
        />
      </svg>
    </div>
  );
};
