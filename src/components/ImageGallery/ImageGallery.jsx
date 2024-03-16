import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.list}>
      {images.map((item) => (
        <li className={css.list} key={item.id}>
          <ImageCard image={item} onClick={() => openModal(item)} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
