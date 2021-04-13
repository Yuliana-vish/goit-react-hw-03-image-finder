
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ url, alt, bigHit, onImgOpen }) => {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => onImgOpen(bigHit, alt)}
    >
      <img
        src={url}
        alt={alt}
        className={styles.ImageGalleryItemImage}        
      />
    </li>
  );
};


export default ImageGalleryItem;


