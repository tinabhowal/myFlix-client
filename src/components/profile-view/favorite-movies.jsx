import React from 'react'
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const FavoriteMovies = () => {

// const handleToggle = (movie) => {
//         toggleFavorite(movie);
//     };

const user = useSelector((state) => state.user.user);
const token = localStorage.getItem('token');
const movies = useSelector((state) => state.movies.list);
  
const favMovies = user.FavouriteMovies ?? [];
  const favMoviesList = favMovies && favMovies.length !== 0 ? movies.filter((m) => favMovies.includes(m.id)) : [];
    return (
    <>
    {/* <Row>
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
    
    </Row> */}

<Row>
      <div className='text-start h2 mb-4'>My Favorite Movies: </div>
      {favMoviesList.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {favMoviesList.map((movie) => (
                      <Col md={4} className='mb-4' key={movie.id}>
                        <MovieCard movie={movie}  user={user} token={token} />
                      </Col>
                    ))}
                  </>
                )}
     </Row>
    </>
  )

};