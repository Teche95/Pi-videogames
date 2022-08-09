import React from "react";

const Paginate = ({ gamePerPage, games, paginado }) => {
    const numberPage = []

    for (let i = 1; i <= Math.ceil(games / gamePerPage); i++) {
        numberPage.push(i)
    }
    return (
        <nav>
            <ul>
                {numberPage && numberPage.map((number, i) =>
                    <button key={i} onClick={() => paginado(number)}>{number}</button>
                )}
            </ul>
        </nav>
    )
}

export default Paginate