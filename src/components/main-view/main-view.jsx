import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { MoviesList } from "../movies-list/movies-list";
import { setUser } from "../../redux/reducers/user";
import { setToken } from "../../redux/reducers/token";
import { setMovies } from "../../redux/reducers/movies";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";





import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  // const storedUser = JSON.parse(localStorage.getItem("user"));
  // const storedToken = localStorage.getItem("token");
  // const [user, setUser] = useState(storedUser ? storedUser : null);
  // const [token, setToken] = useState(storedToken ? storedToken : null);
  //const [movies, setMovies] = useState([]);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token || localStorage.getItem('token'));
  const movies = useSelector((state) => state.movies.list);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  
  const dispatch = useDispatch();

  // const addFavoriteMovie = (movie) => {
  //   return fetch(
  //     `https://myflix-gqp8.onrender.com/users/${user.Username}/movies/${movie.id}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setFavoriteMovies([...favoriteMovies, movie]);
  //       console.log("favorites from main view", favoriteMovies);
        
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const deleteFavoriteMovie = (movie) => {
  //   return fetch(
  //     `https://myflix-gqp8.onrender.com/users/${user.Username}/movies/${movie.id}`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setFavoriteMovies(
  //         favoriteMovies.filter(
  //           (favoriteMovie) => favoriteMovie.id !== movie.id
  //         )
  //       );
        
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const toggleFavorite = (movie) => {
  //   const index = favoriteMovies.indexOf(movie);
  //   if (index > -1) {
  //     deleteFavoriteMovie(movie);
  //   } else {
  //     addFavoriteMovie(movie);
  //   }
  // };

  // useEffect(() => {
  //   const hasFavoriteMovies = movies.filter((movie) =>
  //     favoriteMovies.includes(movie.id)
  //   );
  //   setFavoriteMovies([...hasFavoriteMovies]);
  // }, [movies, user]);

  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   }

  //   fetch(`https://myflix-gqp8.onrender.com/users/${user.Username}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data) {
  //         // setUser({ ...data });
  //         dispatch(setUser({...data}));
  //       } else {
  //         alert("User not found.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [user, token]);
  
  

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflix-gqp8.onrender.com/movies", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log("movies from api:", movies);

        const moviesFromApi = movies.map((movie) => {
          

          return {
            id: movie._id,
            image: movie.ImagePath,
            title: movie.Title,
            description: movie.Description,
            // genre,
            genre: movie.Genre,

            actors: movie.Actors,
            // director,
            director: movie.Director
          };
        });

        // setMovies(moviesFromApi);
        dispatch(setMovies(moviesFromApi));
        console.log("movie data", moviesFromApi);
      });
  }, [token]);

  // let similarMovies = () => {
  //   return movies.filter((movie) => {
  //     if (movie.genre.name === selectedMovie.genre.name){
  //     return movie.genre.name === selectedMovie.genre.name && movie.title !== selectedMovie.title;
  //   }
  //   });
  // };

  return (
    <BrowserRouter>
      {/* <NavigationBar /> */}

    <Row className="justify-content-md-center"> 

    <Routes>

    <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView/>
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView />
                  </Col>
                )}
              </>
            }
          />

         <Route
         
            path="/profile"
            element={
              <>
              <NavigationBar />
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <ProfileView 
                    user={user} 
                    movies={movies} 
                    token={token}
                    // favoriteMovies={favoriteMovies}
                    // toggleFavorite={toggleFavorite}  
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
              <NavigationBar />
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
              <NavigationBar />
              {!user ? <Navigate to='/login' replace /> : <MoviesList />}</>
            }
          />
     
     </Routes>
     </Row>
    </BrowserRouter>
 );
};