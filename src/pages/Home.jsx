import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { MovieCard } from '../components/MovieCard';

import './MovieGrid.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export function Home() {
  const [topMovies, setTopMovies] = useState([])

  // Vai ser uma função assincrona pois vai ser uma requisição
  const getTopRateMovies = async (url) => {
    axios.get(url).then(res => {
      setTopMovies(res.data.results)
    })
  }

  useEffect(() => {
    const topRateUrl = `${moviesURL}top_rated?${apiKey}&language=pt-BR`
    getTopRateMovies(topRateUrl)
  },[])

  return (
    <div className='container'>
      <h2 className='title'>Melhores Filmes:</h2>
      <div className="movies-container">
        {topMovies.length > 0 
          && topMovies.map(movie => {
            return (
              <MovieCard key={movie.id} movie={movie}/>
            )
        })}
      </div>
    </div>
  )
}


