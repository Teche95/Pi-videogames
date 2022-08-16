import React from "react"
import Card from "./Card"
import styles from "./Card.module.css"
import Error from "./Error"

const CardContainer = ({ currentGames }) => {
    return (
        <div className={currentGames.length <= 2 ? styles.one : styles.CardContainer}>
            {
                !currentGames.length ? <Error /> : currentGames.map(el => {
                    return <Card n_game={currentGames.length} name={el.name} image={el.image} genres={el.genres} key={el.id} id={el.id} />
                })
            }
        </div>
    )
}

export default CardContainer