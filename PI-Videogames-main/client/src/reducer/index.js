const initialState = {
    allGamesAux: [],
    platforms: [],
    allGames: [],
    details: [],
    genres: [],
}

function Reducer(state = initialState, action) {
    switch (action.type) {
        case "GET_ALL_GAMES":

            return {
                ...state,
                allGames: action.payload,
                allGamesAux: action.payload
            }
        case "GET_DETAILS":
            return {
                ...state,
                details: [action.payload]
            }
        case "RESET_DETAILS":
            return {
                ...state,
                details: []
            }
        case "SEARCH_NAME":

            return {
                ...state,
                allGames: action.payload
            }
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            }
        case "FILTER_GENRE":
            // let todosLosGeneros = state.allGamesAux
            // const genresFilter = action.payload === "ALL" ? todosLosGeneros : todosLosGeneros.filter(el => el.genres && el.genres.map(el => el).includes(action.payload))
            // return {
            //     ...state,
            //     allGames: genresFilter
            // }

            let todosLosGeneros = state.allGamesAux
            let genresFilter = todosLosGeneros.filter(el => el.genres.map(el => el).includes(action.payload))
            return {
                ...state,
                allGames: action.payload === "ALL" ? todosLosGeneros : genresFilter
            }

        case "FILTER_GAME_EXIST":
            // let state.allGamesAux = state.allGamesAux

            // let gameExists = action.payload === "Created" ? b.filter(el => el.createdInDb) : 

            let gameExists = action.payload === "Api" ? state.allGamesAux.filter(el => typeof el.id === "number") : state.allGamesAux.filter(el => typeof el.id === "string")

            return {
                ...state,
                allGames: action.payload === "All" ? state.allGamesAux : gameExists
            }
        // allGames: action.payload === "All" ? state.allGamesAux : gameExists

        case "FILTER_ORDER":
            let order = action.payload === "a-z" ?
                state.allGames.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (a.name < b.name) {
                        return -1
                    }
                    return 0
                }) :
                state.allGames.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1
                    }
                    if (a.name < b.name) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                allGames: order
            }
        case "FILTER_RATING":
            let orderByRating = action.payload === "min" ?
                state.allGames.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return 1
                    }
                    if (a.rating < b.rating) {
                        return -1
                    }
                    return 0
                }) :
                state.allGames.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return -1
                    }
                    if (a.rating < b.rating) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                allGames: orderByRating
            }

        case "POST_GAME":
            return {
                ...state,
            }
        case "GET_PLATFORM":
            return {
                ...state,
                platforms: action.payload
            }
        case "DELETE_GAME":
            //  state.allGamesAux
            // console.log(delete1);
            let oneGame = state.allGamesAux.filter(el => el.id !== action.payload)
            return {
                ...state,
                allGames: oneGame
            }
        default:
            return state
    }
}

export default Reducer