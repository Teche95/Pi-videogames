import React from "react";
import image from "../images/c798fa254b786f1901a12fb645d61c724e97d599_hq.gif"
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