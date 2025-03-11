import './MovieApp.css';
import { useState } from 'react';

export const MovieApp = () => {

    const [search, setSearch] = useState('')
    const [movieList, setMovieList] = useState([])

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const api_key = '8eb48afa23b7247e85097df8b55626ac'

    const handleInputChange = ({ target }) => {
        setSearch(target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        fetchMovies()
    }

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${search}&api_key=${api_key}&language=es-ES`)
            const data = await response.json()
            setMovieList(data.results)
            console.log(movieList)
            console.log(data)
        } catch (err) {
            console.log('Ha ocurrido el siguiente error', err)
        }
    }



    return (
        <div className='container'>
            <h1>Buscador de Peliculas</h1>

            <form onSubmit={handleSubmit}>
                <input type='text'
                    placeholder='Escribe el nombre de la pelicula'
                    value={search}
                    onChange={handleInputChange}
                />
                <button>Buscar</button>
            </form>

            {movieList &&
                <div className='movie-list'>

                    {movieList.map(movie => {
                        return (
                        <div key={movie.id} className='movie-card'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                        </div>
                        )
                     })}
                </div>
            }
        </div>

    )
}