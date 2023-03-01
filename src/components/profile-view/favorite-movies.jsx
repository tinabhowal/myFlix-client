import React from 'react'
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col} from 'react-bootstrap';

export const FavoriteMovies = ({favoriteMovies, toggleFavorite}) => {

const handleToggle = (movie) => {
        toggleFavorite(movie);
    };

    
    return (
    <>
    <Row>
    <Col xs={12} className="movie-list">
        <h2>My favorites</h2>
    </Col>
    </Row>
    <Row>  
                    {favoriteMovies.map((movie) => (
                        <Col xs={12} md={6} lg={3} key={movie.id}>
                        <MovieCard
                            
                            movie={movie}
                            toggleFavorite={handleToggle}
                            hasFavorite={true}
                            
                        />   
                        </Col> 

                    ))}
    
    </Row>
    </>
  )

};