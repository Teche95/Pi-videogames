import React, { useState } from "react";
import { useEffect } from "react";
import { filterAlphabeticalOrder, filterByGenre, filterByRating, filterGameExist, getAllGames, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux"
import Card from "./Card";
import styles from "./Card.module.css"
import { resetDetails } from "../actions";
// import image from "../images/loading-gif-png-4.gif"
import SearchBar from "./SearchBar";
import Paginate from "./Paginate"
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import styless from "./Home.module.css"

const Home = () => {
    const dispatch = useDispatch()
    const games = useSelector(state => state.allGames)
    const reset = useSelector(state => state.details)
    const allGenres = useSelector(state => state.genres)
    const [orden, setOrden] = useState('')
    const [carga, setCarga] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const [gamePerPage, setGamePerPage] = useState(15)
    const indexOfLastGame = currentPage * gamePerPage // = 15
    const indexOfFirstGame = indexOfLastGame - gamePerPage // = 0
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame)
    // console.log(games);

    useEffect(() => {
        dispatch(getAllGames()).then(() => setCarga(false))
        dispatch(getGenres())
        if (reset.length) {
            dispatch(resetDetails())
        }
    }, [dispatch, reset.length])

    if (carga) {
        return <Loading />
    }


    const handleGenres = (e) => {
        dispatch(filterByGenre(e.target.value))
        setCurrentPage(1)
    }

    const handleCreated = (e) => {
        dispatch(filterGameExist(e.target.value))
        setCurrentPage(1)
    }

    const handleOrder = (e) => {
        dispatch(filterAlphabeticalOrder(e.target.value))
        setOrden(`${e.target.value}`)
    }

    const handleRating = (e) => {
        dispatch(filterByRating(e.target.value))
        setOrden(`${e.target.value}`)
    }

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className={styless.home}>
            <SearchBar />
            <Link to="/home/creategame">
                <button>Crear Juego</button>
            </Link>

            <button onClick={() => window.location.reload()}>Cargar de nuevo</button>
            <div>
                <select onChange={e => handleGenres(e)}>
                    <option value="ALL" >All Genres</option>
                    {
                        allGenres && allGenres.map((el, i) => <option key={i} value={el.name}>{el.name}</option>)
                    }
                </select>
            </div>

            <div>
                <select onChange={e => handleCreated(e)}>
                    <option value="All">All</option>
                    <option value="Created">Created</option>
                </select>
            </div>

            <div>
                <select onChange={e => handleOrder(e)}>
                    <option value="">Order</option>
                    <option value="a-z">A-z</option>
                    <option value="z-a">Z-a</option>
                </select>
            </div>

            <div>
                <select onChange={e => handleRating(e)}>
                    <option value="">Rating</option>
                    <option value="max">Max-min</option>
                    <option value="min">Min-max</option>
                </select>
            </div>

            <Paginate gamePerPage={gamePerPage}
                games={games.length}
                paginado={paginado}
            />
            {/* <img src={image} alt="not found"></img> */}
            <div className={styles.CardContainer}>
                {

                    !currentGames.length ? <Error /> : currentGames.map(el => {
                        return <Card name={el.name} image={el.image} genres={el.genres} key={el.id} id={el.id} />
                    })
                }
            </div>

        </div>
    )
}

export default Home


