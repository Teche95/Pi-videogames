import React from "react";
import image from "../images/Pacman.gif"
import styles from "./Pacman.module.css"


const Loading = () => {
    return (
        <div >
            <div className={styles.pacman}>
                <img src={image} alt="not found"></img>
            </div>
        </div>

    )
}

export default Loading