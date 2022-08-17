import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteGame, getGameByID } from "../actions"
import image from "../images/c798fa254b786f1901a12fb645d61c724e97d599_hq.gif"
import styles from "./Details.module.css"


const Details = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const gameDetailed = useSelector(state => state.details)
    // console.log(gameDetailed[0].createdInDb)

    useEffect(() => {
        dispatch(getGameByID(props.match.params.id))
    }, [dispatch, props.match.params.id])

  

    return (


        <div className={styles.cardcont}>
            <Link className={styles.btn} to="/home">
                Volver
            </Link>
            <div className={styles.cardcont}>
                {
                    !gameDetailed.length ? <img src={image} alt="not found" ></img> :

                        <div>

                            <div className={styles.cardcont}>
                                <h1 className={styles.name}>{gameDetailed[0].name}</h1>
                                <img className={styles.image} src={gameDetailed[0].image} alt="img not found" width='300px' height="200px" />
                                <h3 className={styles.genres}>
                                    {gameDetailed[0].genres.map(e => e).join("  |  ")}
                                </h3>
                                <h3 className={styles.released}>Released: {gameDetailed[0].released}</h3>
                                <h3 className={styles.rating}>Rating: {gameDetailed[0].rating}</h3>
                                <h3 className={styles.platform}>{gameDetailed[0].platforms.join(" | ")} </h3>
                            </div>
                            <div >
                                <p className={styles.description}>{gameDetailed[0].description}</p>
                            </div>
                        </div>
                }
            </div>

        </div>


    )
}

export default Details

