import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const FavoriteButton = ({ movie }) => {

  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const [hasFavorite, setHasFavorite] = useState(user?.FavouriteMovies.includes(
    movie.id
  ));

  const addFavoriteMovie = () => {
    fetch(`https://myflix-gqp8.onrender.com/users/${user.Username}/movies/${movie.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Something went wrong')
        }
      })
      .then((data) => {
        if (!data) return;
        dispatch(setUser(data));
        setHasFavorite(true);
        alert("Successfully added to favorites");
      })
  };


  const deleteFavoriteMovie = () => {
    fetch(`https://myflix-gqp8.onrender.com/users/${user.Username}/movies/${movie.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Something went wrong')
        }
      })
      .then((data) => {
        if (!data) return;
        dispatch(setUser(data));
        setHasFavorite(false);
        alert("Successfully deleted from favorites");
      })
  };

  const toggleFavorite = () => {
    if (hasFavorite) {
      deleteFavoriteMovie();
    } else {
      addFavoriteMovie();
    }
  };

  return (
    <Button variant="link" onClick={() => toggleFavorite()}>
      {hasFavorite ? <FontAwesomeIcon icon={faHeart}  style={{ fontSize: '2em', padding: '0.1em' }} color="red" /> : <FontAwesomeIcon icon={faHeart} style={{ fontSize: '2em', padding: '0.1em' }}/>}
    </Button>
  )
}
