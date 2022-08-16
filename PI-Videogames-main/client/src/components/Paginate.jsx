import React from "react";
import styless from "./Home.module.css"


const Paginate = ({ gamePerPage, games, paginado }) => {
    const numberPage = []

    for (let i = 1; i <= Math.ceil(games / gamePerPage); i++) {
        numberPage.push(i)
    }
    return (
        <nav >
            <li className={styless.paginado}>
                {numberPage && numberPage.map((number, i) =>
                    <button key={i} onClick={() => paginado(number)} className={styless.paginado__number}>{number}</button>
                )}
            </li>
        </nav>
    )
}

export default Paginate