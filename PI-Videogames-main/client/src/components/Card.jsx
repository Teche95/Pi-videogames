import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css"
// import Error from "./Error";

const Card = ({ image, name, genres, id, n_game }) => {

    return (
        <Link to={`/home/${id}`} className={n_game <= 2 ? styles.two : styles["card"]
        }>
            <div className={styles["card__shadow"]}>
            </div>
            <img src={image} alt='img not found' loading="lazy" className={styles["card__image"]} />

            <div className={styles["card__info"]}>

                <h3 className={styles["card__name"]}>{name}</h3>
                <div className={styles["card__genres-container"]}>
                    {genres && genres.map((e, i) =>
                        <h4 key={i} className={styles["card__genre"]}>{e}</h4 >
                    )}
                </div>
            </div>
        </Link >
    )
}

export default Card;