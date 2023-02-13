// import PropTypes from "prop-types";


// export const MovieCard = ({movie, onMovieClick}) => {
//     return (
//         <div
//         onClick = {() => {
//             onMovieClick(movie);
//         }}
//         >
//             {movie.title}
//         </div>
//     );
// };

// MovieCard.propTypes = {
//    movie: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     genre:  PropTypes.array,
//     director:  PropTypes.array
//    }).isRequired,
  
//    onMovieClick: PropTypes.func.isRequired
// };

import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({movie, onMovieClick}) => {
//     return (
//         <div
//         onClick = {() => {
//             onMovieClick(movie);
//         }}
//         >
//             {movie.title}
//         </div>
//     );
// };

return (
    
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} style={{height:"20rem"}} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text><span>Director</span>{movie.director}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
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
   }).isRequired,
  
   onMovieClick: PropTypes.func.isRequired
};