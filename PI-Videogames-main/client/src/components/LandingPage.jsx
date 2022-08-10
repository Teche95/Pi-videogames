import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css"


const LandingPage = () => {
    return (
        <div className={styles.landing} >

            <div className={styles.landingTitle}>
                <h1>VIDEOGAMES APP</h1>
            </div>

            <div className={styles.landingLink}>
                <Link to="/home">
                    INGRESAR
                </Link>
            </div>

        </div>
    );
}

export default LandingPage;