import css from "./ImageCard.module.css";
const ImageCard = ({ image, onClick }) => {
  return (
    <div className={css.wrapper}>
      <img
        className={css.image}
        src={image.urls.small}
        alt={image.description}
        onClick={onClick}
      />
    </div>
  );
};
export default ImageCard;
