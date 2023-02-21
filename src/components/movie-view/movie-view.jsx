

import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies,  hasFavorite, toggleFavorite }) => {

  
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(movie);
  
  }

  
  
   
  const favoriteButtonLabel = hasFavorite? "Remove from favorite" : "Add to favorite";
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  

  return (
    <div>
      <div>
        <img src={movie.image} alt="movie" className="w-100 h-75" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>ID: </span>
        <span>{movie.id}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.actors}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <Link to={`/`}>
      <button className="back-button">Back</button>
      <Button variant="link" onClick={ handleFavoriteClick }>{favoriteButtonLabel}</Button>
      </Link>
    </div>
  );
};