import React from "react";
import image from "../images/pacrun-pacman.gif"
import styles from "./Pacman.module.css"


const Loading = () => {
    return (
        <div className={styles.Loading}>
            <div className={styles.pacman}>
                <img src={image} alt="not found"></img>
            </div>
        </div>

    )
}

export default Loading