import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGameByID } from "../actions"
import image from "../images/Pacman.gif"
// import styles from "./Pacman.module.css"

const Details = (props) => {

    const dispatch = useDispatch()
    const gameDetailed = useSelector(state => state.details)
    // console.log(gameDetailed[0].genres)

    useEffect(() => {
        dispatch(getGameByID(props.match.params.id))
    }, [dispatch, props.match.params.id])

    return (
        <div>
            
            <Link to="/home">
                <button>Volver</button>
            </Link>

            {
                !gameDetailed.length ? <img src={image} alt="not found" ></img> :
                    <div>
                        <h3>{gameDetailed[0].name}</h3>
                        <img src={gameDetailed[0].image} alt="img not found" width='300px' height="200px" />
                        {gameDetailed[0].genres.map((e, i) => {
                            return (
                                <div key={i}>
                                    <p >{e}</p>
                                </div>
                            )
                        }
                        )}
                        <p>{gameDetailed[0].description}</p>
                        <h3>released: {gameDetailed[0].released}</h3>
                        <h3>rating: {gameDetailed[0].rating}</h3>
                        <h3>platform: {gameDetailed[0].platforms}</h3>
                    </div>
            }
        </div>
    )
}

export default Details

