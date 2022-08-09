import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { gamePost, getGenres, getPlatforms } from "../actions";


const CreateGame = () => {
    const dispatch = useDispatch();
    const history = useHistory();
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
        } else if (/[!#$%&?¿°´*¬`~,.<>;':"\]{}()=_+-]/.test(input.description)) {
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

        // if (input.genres.length === 0) {
        //     errors.genres = "Al menos un genero"
        // }

        // if (input.platforms.length === 0) {
        //     errors.platforms = "Al menos una plataforma"
        // }

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
        }
    }

    const handlePlatforms = (e) => {
        if (e.target.value === "select") return input
        if (!input.platforms.includes(e.target.value)) {
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
    }

    const handleDeletePlatforms = (e) => {
        setInput({
            ...input,
            platforms: input.platforms.filter(el => el !== e)
        })

    }

    const handleDeleteGenres = (e) => {
        setInput({
            ...input,
            genres: input.genres.filter(el => el !== e)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // alreadyExists === "Ya existe un juego con ese nombre" && alert(alreadyExists)

        if (!input.name || !input.description || !input.released || !input.image || !input.genres.length || !input.platforms.length) {
            // console.log("object");
            alert("Faltan datos")
        }

        let alreadyExists = await dispatch(gamePost(input))
        if (alreadyExists === "Ya existe un juego con ese nombre") return alert("Ya existe un juego con ese nombre")
        alert("Juego creado")
        history.push("/home")
    }

    return (
        <div>

            <Link to="/home">
                <button>Volver</button>
            </Link>

            <form autoComplete="off" onSubmit={(e) => { handleSubmit(e) }}>

                <div>
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

                <div>
                    <label>Description: </label>
                    <input
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

                <div>
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

                <div>
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

                <div>
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

                <div>
                    <label>Genres: </label>
                    <select onChange={e => handleGenres(e)}>
                        <option value="select">Seleccionar...</option>
                        {
                            allGenres.map((el, i) =>
                                <option key={i} value={el.name}>{el.name}</option>
                            )
                        }
                    </select>

                    {
                        input.genres.map(el =>
                            <div>
                                <p>{el}</p>
                                <button type="button" onClick={() => handleDeleteGenres(el)}>x</button>
                            </div>
                        )
                    }
                    {
                        errors.genres && <span> {errors.genres}</span>
                    }
                </div>

                <div>
                    <label>Platforms: </label>
                    <select onChange={e => handlePlatforms(e)}>
                        <option value="select">Seleccionar...</option>
                        {
                            allPlatforms.map((el, i) =>
                                <option key={i} value={el}>{el}</option>
                            )
                        }
                    </select>
                    {
                        input.platforms.map(el =>
                            <div>
                                <p>{el}</p>
                                <button type="button" onClick={() => handleDeletePlatforms(el)}  >x</button>
                            </div>)
                    }
                    {
                        errors.platforms && <span> {errors.platforms}</span>
                    }
                </div>


                <button type="submit" disabled={errors.name || errors.description || errors.image || errors.rating ? true : false}  >Crear Juego</button>
                {/* si esta en false se habilita  */}
                {/* en true de deshabilita */}
            </form>

        </div >

    )
}

export default CreateGame