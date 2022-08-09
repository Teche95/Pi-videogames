import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css"
// import Error from "./Error";

const Card = ({ image, name, genres, id }) => {
    console.log(genres)
    return (


        <div className={styles.wrapper} >
            <Link to={`/home/${id}`}>
                {<h3 >{name}</h3>}
                <img src={image} alt='img not found' width='350px' height='200px' />
            </Link>
            {genres && genres.map((e, i) =>
                <h4 key={i} >{e}</h4>
            )}

        </div>


    )
}

export default Card;