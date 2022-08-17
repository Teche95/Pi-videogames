import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { gamePost, getGenres, getPlatforms } from "../actions";
import styles from "./CreateGame.module.css"

const CreateGame = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const games = useSelector(state => state.allGames)
    const allGenres = useSelector(state => state.genres)
    const allPlatforms = useSelector(state => state.platforms)
    // const [isDisabled, setDisabled] = useState(false);

    const [errors, setErrors] = useState({})
    // console.log(errors);
    const [input, setInput] = useState({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: []
    })

    const validate = (input) => {
        let errors = {}

        if (!input.name) {
            errors.name = "Nombre requerido"
        } else if (/[!#$%&?¿°´*¬`~,.<>;':"\]{}()=_+-]/.test(input.name)) {
            // } else if (/[!#$%&?¿°´*¬`~,.<>;':"\/\[\]\|{}()=_+-]/.test(input.name)) {
            errors.name = "Solo letras y numeros"
        } else if (input.name.trim() === "" || input.name.length < 3) {
            errors.name = "No menos de tres caracteres"
        } else if (input.name.length >= 20) {
            errors.name = "Solo nombre de 15 caracteres"
        }

        if (!input.description) {
            errors.description = "Descripcion requerida"
        } else if (/^\d+$/.test(input.description)) {
            errors.description = "No puede ser solo numeros"
        } else if (input.description.trim() === "" || input.description.length < 3) {
            errors.description = "No puede estar vacío"
        } else if (/[!#$%&?¿°´*¬`~<>;':"\]{}()=_+]/.test(input.description)) {
            errors.description = "Solo letras y numeros"
        }

        let fecha = input.released.split("-")
        let fecha2 = parseInt(fecha[0])
        if (fecha2 > 2065 || fecha2 < 2022) {
            errors.released = "Ingrese fecha valida"
        } else if (!input.released) {
            errors.released = "Fecha requerida"
        }

        if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(input.image)) {
            errors.image = "Url invalida"
        }

        if (!input.rating) {
            errors.rating = "Rating requerido"
        } else if (parseInt(input.rating) > 5 || parseInt(input.rating) < 1) {
            errors.rating = "Rating entre 1 y 5"
        }

        if (input.genres.length === 0) {
            errors.genres = "Al menos un genero"
        }

        if (input.platforms.length === 0) {
            errors.platforms = "Al menos una plataforma"
        }

        return errors
    }

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        // setDisabled(e.target.value)
    }

    // ordenar los generos alfabeticamente
    const handleGenres = (e) => {
        if (e.target.value === "select") return input
        if (!input.genres.includes(e.target.value)) {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
            setErrors(validate({
                ...input,
                genres: [...input.genres, e.target.value]
            }))
        }
    }

    const handlePlatforms = (e) => {
        if (e.target.value === "select") return input
        if (!input.platforms.includes(e.target.value)) {
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
            setErrors(validate({
                ...input,
                platforms: [...input.platforms, e.target.value]
            }))
        }
    }

    const handleDeletePlatforms = (e) => {
        setInput({
            ...input,
            platforms: input.platforms.filter(el => el !== e)
        })
        setErrors(validate({
            ...input,
            platforms: input.platforms.filter(el => el !== e)
        }))
    }

    const handleDeleteGenres = (e) => {
        setInput({
            ...input,
            genres: input.genres.filter(el => el !== e)
        })
        setErrors(validate({
            ...input,
            genres: input.genres.filter(el => el !== e)
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!input.name || !input.description || !input.released || !input.image || !input.genres.length || !input.platforms.length) {
            // console.log("object");
            return alert("Faltan datos")
        }
        if (games.find(el => el.name.toLowerCase() === input.name.toLowerCase())) {
            return alert("Ya existe un juego con ese nombre")
        }
        dispatch(gamePost(input))
        alert("Juego creado")
        // let alreadyExists = await 
        // if (alreadyExists === "Ya existe un juego con ese nombre") return alert("Ya existe un juego con ese nombre")
        // alert("Juego creado")
        history.push("/home")
    }

    return (
        <div className={styles.container}>

            <Link className={styles.btnvolver} to="/home">
                Volver
            </Link>

            <form className={styles.form} autoComplete="off" onSubmit={(e) => { handleSubmit(e) }}>

                <div className={styles.nameinput}>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        // required
                        onChange={e => handleInputChange(e)}
                        autoFocus
                    />
                    {
                        errors.name && <span> {errors.name}</span>
                    }
                </div>



                <div className={styles.releasedinput}>
                    <label>Released: </label>
                    <input
                        type="date"
                        value={input.released}
                        name="released"
                        onChange={e => handleInputChange(e)}
                    />
                    {
                        errors.released && <span> {errors.released}</span>
                    }
                </div>

                <div className={styles.imageinput}>
                    <label>Image: </label>
                    <input
                        type="url"
                        value={input.image}
                        name="image"
                        placeholder="https://example.jpg"
                        onChange={e => handleInputChange(e)}
                    />
                    {
                        errors.image && <span> {errors.image}</span>
                    }
                </div>

                <div className={styles.ratinginput}>
                    <label>Rating: </label>
                    <input
                        type="number"
                        value={input.rating}
                        name="rating"
                        min="1" max="5"
                        onChange={e => handleInputChange(e)}
                    />
                    {
                        errors.rating && <span> {errors.rating}</span>
                    }
                </div>

                <div className={styles.genresinput}>
                    <label>Genres: </label>
                    <select onChange={e => handleGenres(e)}>
                        <option value="select">Seleccionar...</option>
                        {
                            allGenres.map((el, i) =>
                                <option key={i} value={el.name}>{el.name}</option>
                            )
                        }
                    </select>
                    <div className={styles.gp}>
                        {
                            input.genres.map(el =>
                                <div >
                                    <button type="button" onClick={() => handleDeleteGenres(el)}>x</button>
                                    <p>{el}</p>
                                </div>
                            )
                        }
                    </div>

                    {
                        errors.genres && <p className={styles.gpe}> {errors.genres}</p>
                    }
                </div>

                <div className={styles.platforminput}>
                    <label>Platforms: </label>
                    <select onChange={e => handlePlatforms(e)}>
                        <option value="select">Seleccionar...</option>
                        {
                            allPlatforms.map((el, i) =>
                                <option key={i} value={el}>{el}</option>
                            )
                        }
                    </select>
                    <div className={styles.gp}>
                        {
                            input.platforms.map(el =>
                                <div>
                                    <p>{el}</p>
                                    <button type="button" onClick={() => handleDeletePlatforms(el)}  >x</button>
                                </div>)
                        }
                    </div>

                    {
                        errors.platforms && <p className={styles.gpe}> {errors.platforms}</p>
                    }
                </div>

                <div className={styles.descriptioninput}>
                    <label>Description: </label>
                    <textarea
                        placeholder="agrega una breve descripcion"
                        rows="10"
                        cols="50"
                        type="text"
                        value={input.description}
                        name="description"
                        // required 
                        onChange={e => handleInputChange(e)}
                    />
                    {
                        errors.description && <span> {errors.description}</span>
                    }
                </div>

                <div className={styles.btncrear}>
                    <button className={styles.crearjuego} type="submit" disabled={errors.name || errors.description || errors.released || errors.image || errors.rating ? true : false}  >Crear Juego</button>
                </div>

                {/* si esta en false se habilita  */}
                {/* en true de deshabilita */}
            </form>

        </div >

    )
}

export default CreateGame