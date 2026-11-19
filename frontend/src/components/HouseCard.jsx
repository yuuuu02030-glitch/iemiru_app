import { useState } from "react";
import styles from "../pages/TopPage.module.css";
import { houseColor } from "../constants/houseColor";

function HouseCard({ house }) {
  const images = [
    house.imageUrl1,
    house.imageUrl2,
    house.imageUrl3,
    house.imageUrl4,
  ];
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex(index === images.length - 1 ? 0 : index + 1);
  };

  const prev = () => {
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  return (
    <article
      className={styles.houseCard}
      style={{ "--house-color": houseColor[house.houseId] }}
    >
      <p className={styles.houseNo}>
        No.{house.houseId} <span className={styles.dot}></span>{" "}
        {house.companyName}
      </p>
      <h3 className={styles.houseName}>{house.houseName}</h3>

      <div className={styles.carousel}>
        <img
          src={images[index]}
          alt={`${house.houseName}の写真`}
          className={styles.photo}
        />
        <button
          type="button"
          onClick={prev}
          className={`${styles.arrow} ${styles.prev}`}
          aria-label="前の写真"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          className={`${styles.arrow} ${styles.next}`}
          aria-label="次の写真"
        >
          ›
        </button>
        <p className={styles.counter}>
          {index + 1} / {images.length}
        </p>
      </div>

      {/* サムネイル4枚 */}
      <div className={styles.thumbs}>
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`${styles.thumb} ${index === i ? styles.selected : ""}`}
            aria-label={`${i + 1}枚目の写真を表示`}
          >
            <img src={src} alt="" />
          </button>
        ))}
      </div>

      <p className={styles.description}>{house.description}</p>
    </article>
  );
}

export default HouseCard;
