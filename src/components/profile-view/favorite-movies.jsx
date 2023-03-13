import React from 'react'
import { MovieCard } from '../movie-card/movie-card';
import { Row, Col} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const FavoriteMovies = () => {



const user = useSelector((state) => state.user.user);
const token = localStorage.getItem('token');
const movies = useSelector((state) => state.movies.list);
  
const favMovies = user.FavouriteMovies ?? [];
  const favMoviesList = favMovies && favMovies.length !== 0 ? movies.filter((m) => favMovies.includes(m.id)) : [];
    return (
    <>
    

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