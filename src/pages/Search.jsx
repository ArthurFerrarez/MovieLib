import { useState, useEffect } from 'react';
import axios from 'axios';

// Para pegar a query da URL
import { useSearchParams } from 'react-router-dom';

import { MovieCard } from '../components/MovieCard';

import './MovieGrid.css';

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

export function Search() {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
    axios.get(url).then(res => {
      setMovies(res.data.results)
    })
  }
  useEffect(() => {
    const searchWithQueryUrl = `${searchUrl}?${apiKey}&query=${query}&language=pt-BR`
    getSearchedMovies(searchWithQueryUrl)
  },[query])


  return (
    <div className='container'>
      <h2 className='title'>Resultados: <span className="query-text">{query}</span></h2>
      <div className="movies-container">
        {movies.length > 0 
          && movies.map(movie => {
            return (
              <MovieCard key={movie.id} movie={movie}/>
            )
        })}
      </div>
    </div>
  )
}


