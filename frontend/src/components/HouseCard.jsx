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

      <div>
        <button type="button" onClick={prev}>
          ‹
        </button>
        <p>
          {index + 1} / {images.length}
        </p>
        <img src={images[index]} alt={`${house.houseName}の写真`} />
        <button type="button" onClick={next}>
          ›
        </button>
        <p className={styles.description}>{house.description}</p>
      </div>
    </article>
  );
}

export default HouseCard;
