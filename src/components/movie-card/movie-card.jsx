import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({movie, hasFavorite, toggleFavorite}) => {

const handleFavoriteClick = (e) => {
  e.preventDefault();
  toggleFavorite(movie);

}

const favoriteButtonLabel = hasFavorite? "Remove from favorite" : "Add to favorite";

return (
    
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} style={{height:"20rem"}} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text><span>Director</span>{movie.director}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        <Button variant="link" onClick={ handleFavoriteClick}>{favoriteButtonLabel}</Button>
        <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
      </Card>
  );
};



MovieCard.propTypes = {
   movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre:  PropTypes.array,
    director:  PropTypes.array
   }).isRequired
};