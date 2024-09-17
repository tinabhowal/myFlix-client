import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FavoriteButton } from "./favorite";

export const MovieCard = ({movie}) => {


return (
    
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} style={{height:"20rem"}} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text><span>Director: </span> {movie.director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>               
        <Button variant="link">Movie details</Button>
        </Link>
        <FavoriteButton className='mt-auto' movie={movie} />       
      </Card.Body>
      </Card>
  );
};





MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,

    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }).isRequired,
  }).isRequired,
};