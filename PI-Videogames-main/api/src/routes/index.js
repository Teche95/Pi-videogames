const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Videogame, Genre } = require('../db')
const router = Router();
const { apikey } = process.env

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    // necesito traerme 100 resultados que estan divididos en 5 paginas
    // deberia hacer request a 5 paginas con un for <= 5
    try {
        let array = []
        for (let i = 1; i <= 1; i++) {
            let info = await axios.get(`https://api.rawg.io/api/games?key=${apikey}&page=${i}`)
            info.data.results?.map(el => {
                array.push({
                    id: el.id,
                    image: el.background_image,
                    name: el.name,
                    genres: el.genres.map(el => el.name),
                    released: el.released,
                    rating: el.rating,
                    platforms: el.platforms.map(el => el.platform.name)
                })
            })
        }
        return array
    } catch (error) {
        console.log(error)
    }

}
// getApiInfo()

//  tengo que traerme la info de la tabla Videogames e incluirle la tabla generos
const getDbInfo = async () => {
    let a = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        },
    })

    let b = a.map(el => {
        return {
            id: el.id,
            name: el.name,
            genres: el.genres.map(el => el.name),
            image: el.image,
            released: el.released,
            rating: el.rating,
            platforms: el.platforms,
            createdInDb: el.createdInDb
            // genres =[
            // "accion",
            // "aventura"
            // ]
        }
    })
    // console.log(typeof b)
    return b
}

// getDbInfo()


// porque tengo que juntar dos tablas?
// porque al buscar por nombre o id puedo buscar en la api y en db 

const getAllInfo = async () => {
    let api = await getApiInfo()
    let db = await getDbInfo()
    let all = [...api, ...db]
    // console.log(all)
    return all
}
// getAllInfo()


router.get("/videogames", async (req, res) => {
    const { name } = req.query
    // console.log(name)
    const allgames = await getAllInfo()
    try {
        if (name) {
            let gameResult = allgames
                .filter(game => game.name.toLowerCase().includes(name.toLowerCase()))
            // .slice(0, 15);
            gameResult.length > 0
                ? res.status(200).json(gameResult)
                : res.send([])
            // res.json([{status: 400,message: 'Error'}]);
            // console.log(gameResult.length)
            // res.send(gameResult)
        } else {
            res.status(200).send(allgames);
            // console.log(allgames.length)
        }
    } catch (error) {
        console.log(error.message)
    }
})
// 00 : 04 . 32
// GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados



router.get("/videogame/:id", async (req, res) => {
    const { id } = req.params
    // id api
    try {
        if (id.length <= 8 && typeof id === 'string') {
            let gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apikey}`)
            let detailGame = {
                name: gameApi.data.name,
                image: gameApi.data.background_image,
                description: gameApi.data.description_raw,
                genres: gameApi.data.genres.map(el => el.name),
                released: gameApi.data.released,
                rating: gameApi.data.rating,
                platforms: gameApi.data.platforms.map(el => el.platform.name)
            }
            res.status(200).send(detailGame)
        } else {
            // uuid
            let gameDb = await Videogame.findOne({
                where: {
                    id
                },
                include: {
                    model: Genre,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            })

            let b = {
                id: gameDb.id,
                name: gameDb.name,
                genres: gameDb.genres.map(el => el.name),
                description: gameDb.description,
                image: gameDb.image,
                released: gameDb.released,
                rating: gameDb.rating,
                platforms: gameDb.platforms,
                createdInDb: gameDb.createdInDb
            }
            res.status(200).send(b)
        }
    } catch (error) {
        res.status(404).send("Id invalido o inexistente")
    }

})

router.post("/videogames", async (req, res) => {

    const { name, image, description, released, rating, genres, platforms } = req.body

    try {
        let a = await getAllInfo()
        let b = a.filter(el => el.name.toLowerCase() === name.toLowerCase())
        if (b.length) res.send("Ya existe un juego con ese nombre")
        else {
            let [newGame, created] = await Videogame.findOrCreate({
                where: {
                    name
                },
                defaults: {
                    image,
                    description,
                    released,
                    rating,
                    platforms
                }
            })

            genres.forEach(async el => {
                let genreDb = await Genre.findOne({
                    where: { name: el }
                })

                newGame.addGenre(genreDb)
            })
            res.send("Juego creado")
        }

    } catch (error) {
        console.log(error.message)
    }
})


router.get("/genres", async (req, res) => {
    try {
        let verif = await Genre.findAll()
        if (verif.length === 0) {
            // console.log(a)
            let apiGenres = await axios(`https://api.rawg.io/api/genres?key=${apikey}`)

            apiGenres.data.results.forEach(el => {
                Genre.findOrCreate({
                    where: {
                        name: el.name
                    }
                })
            })
            let allGenres = await Genre.findAll()
            res.status(200).send(allGenres)
        } else {
            res.status(200).send(verif)
        }
    } catch (error) {
        res.send(error.message)
    }
})



 


const getPlatforms = async () => {
    let arr = []
    let allplatforms = await getApiInfo()
    allplatforms.map(el => {
        el.platforms.map(el => {
            if (!arr.includes(el)) {
                arr.push(el)
            }
        })
    })
    return arr
   
}


router.get("/platforms", async (req, res) => {
    let platforms = await getPlatforms()
    res.status(200).send(platforms)
})

module.exports = router;
