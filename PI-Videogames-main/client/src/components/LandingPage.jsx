import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css"


const LandingPage = () => {
    return (
        <div className={styles.landing} >
            <h1>Pi-Videogames</h1>
            <Link to="/home">
                <button>Ingresar</button>
            </Link>
        </div>
    );
}

export default LandingPage;