import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchGame } from '../actions';
import LoadingSearch from "./LoadingSearch"
import styless from "./Home.module.css"

const SearchBar = ({ setCurrentPage }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [loader, setLoader] = useState(false)

    const handleUserInput = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSearchName = async (e) => {
        // let ayuda = await dispatch(searchGame(name))
        // ayuda === 'no se encontró juego' && alert(ayuda)
        setLoader(true)
        if (name === "") {
            alert("Ingrese busqueda")
            setLoader(false)
        } else {
            dispatch(searchGame(name)).then(() => setLoader(false))
            setCurrentPage(1)
            setName("")
        }
    }

    return (
        <div>
            {
                loader ? <LoadingSearch /> :
                    <div className={styless.searchbar}>
                        <input className={styless.searchbar__input} type="text" value={name} placeholder="Buscar juego..." onChange={e => handleUserInput(e)} />

                        <button className={styless.searchbar__button} type="submit" onClick={e => handleSearchName(e)}>
                            <span class="material-symbols-outlined">
                                search
                            </span>
                        </button>
                    </div>
            }
        </div>
    )
}

export default SearchBar

