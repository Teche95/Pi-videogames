import React from "react";
import Loading from "../images/1490.gif";
import styles from "./LoadingSearch.module.css"


const LoadingSearch = () => {
    return (
        <div >
            <div className={styles.loading}>
                <img src={Loading} alt="not found"></img>
            </div>
        </div>

    )
}

export default LoadingSearch