
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./movie-view.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const MovieView = ({ movies,  hasFavorite, toggleFavorite }) => {

  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);
  
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(movie);
  
  }

  

  const favoriteButtonLabel = hasFavorite? "Remove from favorite" : "Add to favorite";
  

  

  return (
    <div>
      <div>
        <img src={movie.image} alt="movie" className="w-100 h-75" />
      </div>
      <div>
      <p><span>Title: </span>
        <span>{movie.title}</span></p>
      </div>
      <div>
        <p><span>ID: </span>
        <span>{movie.id}</span></p>
      </div>
      <div>
        <p><span>Description: </span>
        <span>{movie.description}</span></p>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.Name}</span>
        <p><span>  {movie.genre.Description} </span> </p>
        
      </div>
      <div>
        <span>Actors: </span>
        <p><span>{movie.actors}</span></p>

      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.Name}</span>
        <p><span>Bio: </span>
        <span>{movie.director.Bio}</span></p> 
        <p><span>Birthyear: </span>
        <span>{movie.director.Birth}</span></p>
        <p><span>Deathyear: </span>
        <span>{movie.director.Death}</span></p>
      </div>
      <Link to={`/`}>
      <button className="back-button">Back</button>
      {/* <Button variant="link" onClick={ handleFavoriteClick }>{favoriteButtonLabel}</Button> */}
      </Link>
      <Button variant="link"  onClick={handleFavoriteClick}>
        <FontAwesomeIcon
        icon={faHeart}
        style={{ fontSize: '2em', padding: '0.1em' }}
        className={hasFavorite? "text-danger" : ""}
        />
      </Button>
    </div>
  );
};

