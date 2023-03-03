import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

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
        <Card.Text><span>Director: </span> {movie.director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        
        <Button variant="link" onClick={ handleFavoriteClick }>
          {/* {favoriteButtonLabel} */}
          <FontAwesomeIcon 
          icon={faHeart} 
          style={{ fontSize: '2em', padding: '0.1em' }}
          className={hasFavorite? "text-danger" : ""}/>
          </Button>
          
        <Button variant="link">See more</Button>
        </Link>
      </Card.Body>
      </Card>
//     <Card className="h-100">
//     <div style={{ position: 'relative' }}>
//      <FontAwesomeIcon
//       icon={faHeart}
//       style={{ fontSize: '2em', padding: '0.5em', position: 'absolute', top: 0, right: 0  }}
//       className={` ${hasFavorite ? 'text-danger' : 'text-light'}`}
//       onClick={handleFavoriteClick}
//      />
//     <Card.Img variant="top" src={movie.image} style={{ height: '20rem' }} />
//   </div>
//   <Card.Body>
//     <Card.Title>{movie.title}</Card.Title>
//     <Card.Text><span>Director: </span> {movie.director.Name}</Card.Text>
//     <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
//       <Button variant="link">See more</Button>
//     </Link>
//   </Card.Body>
// </Card>

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