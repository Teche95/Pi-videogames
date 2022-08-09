import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { searchGame } from '../actions';


const SearchBar = () => {
    const dispatch = useDispatch()
    // const resetHomePage = useSelector(state => state.allGames)

    const [name, setName] = useState("")


    // necesito una funcion que me guarde en el estado lo que escribe el usuario
    const handleUserInput = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSearchName = async (e) => {
        // e.preventDefault()
        // let ayuda = await dispatch(searchGame(name))
        // ayuda === 'no se encontró juego' && alert(ayuda)

        if (name === "") {
            alert("Ingrese busqueda")
        } else {
            dispatch(searchGame(name))
        }
        setName("")
    }

    return (
        <div>
            <input type="text" value={name} placeholder="Buscar juego..." onChange={e => handleUserInput(e)} />
            <button type="submit" onClick={e => handleSearchName(e)}>Buscar</button>
        </div>
    )
}

export default SearchBar