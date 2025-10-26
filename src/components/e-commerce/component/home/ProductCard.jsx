// ProductCard.js
import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({ image, name, price, onViewMore }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.priceRow}>
          <p className={styles.price}>₹{price}</p>
          <button onClick={onViewMore} className={styles.button}>
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
