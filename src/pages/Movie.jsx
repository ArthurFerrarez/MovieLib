import { useParams } from "react-router-dom";
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { MovieCard } from '../components/MovieCard';
import { useEffect, useState } from "react";

import axios from "axios";
import currencyFormatter from 'currency-formatter';

import './Movie.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    axios.get(url).then(res => {
      setMovie(res.data)
    })
  }

  const formatter = (valor) => {
    return currencyFormatter.format(valor ,{ locale:'pt-BR' })
  }

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}&language=pt-BR`
    getMovie(movieUrl)
  })

  return (
    <div className="container2">
        {movie && (
          <>
          <div className="movie-page">
            <MovieCard movie={movie} showLink={false}/>
            <p className="tagline">
              {movie.tagline}
            </p>
          </div>
            
            <div className="info">
              <h3>
                <BsWallet2/> Orçamento:
              </h3>
              <p>{formatter(movie.budget)}</p>
            
              <h3>
                <BsGraphUp/> Receita:
              </h3>
              <p>{formatter(movie.revenue)}</p>
        
              <h3>
                <BsHourglassSplit/> Duração:
              </h3>
              <p>{movie.runtime} minutos</p>

              <h3>
                <BsFillFileEarmarkTextFill/> Descrição
              </h3>
              <p>{movie.overview}</p>
            </div>
          </>
        )}
    </div>
  )
}


