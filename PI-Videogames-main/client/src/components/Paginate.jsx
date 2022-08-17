import React from "react";
import styless from "./Home.module.css"

//                       15  // n_games //function  
const Paginate = ({ gamePerPage, games, paginado }) => {
    const numberPage = []       //   50    /   15       = 3.33 --> 4
                              //    100   /    15       = 6.6 --> 7
    for (let i = 1; i <= Math.ceil(games / gamePerPage); i++) {
        numberPage.push(i) // [1,2,3,4]
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
