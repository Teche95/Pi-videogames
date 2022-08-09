import axios from "axios";

export function getAllGames() {
    return async dispatch => {
        let response = await axios("/videogames")
        return dispatch({ type: "GET_ALL_GAMES", payload: response.data })
    }
}

export function getGameByID(id) {
    return async dispatch => {
        let response = await axios(`/videogame/${id}`)
        // console.log(json.data)
        return dispatch({ type: "GET_DETAILS", payload: response.data })
    }
}

export function resetDetails() {
    return {
        type: "RESET_DETAILS"
    }
}

export function searchGame(name) {
    return async dispatch => {
        let response = await axios(`/videogames?name=${name}`)
        // if(!(response.data === 'no se encontró juego')) 
        // if(!response.data[0].message) dispatch({ type: "SEARCH_NAME", payload: response.data })
        // return response.data[0].message
        console.log(response.data);
        return dispatch({ type: "SEARCH_NAME", payload: response.data })
    
    }
}

// [ ] Botones/Opciones para filtrar por género  por videojuego existente o agregado por nosotros
export function filterByGenre(payload) {
    // console.log(payload)
    return {
        type: "FILTER_GENRE",
        payload
    }
}


//Botones/Opciones para filtrar por videojuego existente o agregado por nosotros
export function filterGameExist(payload) {
    return {
        type: "FILTER_GAME_EXIST",
        payload
    }
}

// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético 
export function filterAlphabeticalOrder(payload) {
    return {
        type: "FILTER_ORDER",
        payload
    }
}

// por rating
export function filterByRating(payload) {
    return {
        type: "FILTER_RATING",
        payload
    }
}

export function getGenres() {
    return async dispatch => {
        let response = await axios.get("/genres")
        // console.log(json.data)
        return dispatch({ type: "GET_GENRES", payload: response.data })
    }
}

export function gamePost(payload) {
    return async dispatch => {
        let response = await axios.post("/videogames",payload)
        // console.log(response)
        return response.data
        // dispatch({ type: "POST_GAME", payload: response.data })
    }
}

export function getPlatforms() {
    return async dispatch => {
        let response = await axios.get("/platforms")
        return dispatch({ type: "GET_PLATFORM", payload: response.data })
    }
}

