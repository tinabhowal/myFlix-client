

import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView} from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
// import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState({
      Username:"",
      Password:"",
      Email:"",
      Birthday:"",
      FavoriteMovies:[]
    });
    let [token, setToken] = useState(null);
    let storedUsername = localStorage.getItem("username");
    const [username, setUsername] = useState(storedUsername? storedUsername : null );  
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [favoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies);
    
    
    
    const addFavoriteMovie = (movie) => {
      return fetch(`https://myflix-gqp8.onrender.com/users/${user.Username}/movies/${movie.id}`,
       {
               method: "POST",
               headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setFavoriteMovies([...favoriteMovies, movie]);
          })
          .catch(error => console.log(error));
        };

    const deleteFavoriteMovie = (movie) => {
      return fetch(`https://myflix-gqp8.onrender.com/users/${user.Username}/movies/${movie.id}`,
       {
               method: "DELETE",
               headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setFavoriteMovies(favoriteMovies.filter((favoriteMovie) => favoriteMovie.id !== movie.id));
          })
          .catch(error => console.log(error));
        };

    const toggleFavorite = (movie) => {
      const index = favoriteMovies.indexOf(movie);
      if (index > -1){
        deleteFavoriteMovie(movie);
      }else{
        addFavoriteMovie(movie);
      }
    };

    useEffect(() => {
      const hasFavoriteMovies = movies.filter((movie) =>
        favoriteMovies.includes(movie.id)
      );
      setFavoriteMovies([...hasFavoriteMovies]);
    }, [movies, user]); 


    useEffect(() => {
      if(!token){
        return;
      }

      fetch(`https://myflix-gqp8.onrender.com/users/${user.Username}`,
      {
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
        .then((data) => {
          if(data){
            setUser({...data});
          }else{
            alert("User not found.");
          }
        }).catch((error) => {
          console.log(error);
        });
    },[username, token]);

    useEffect(() => {
      if (!token){
            return;
         }
       
        fetch("https://myflix-gqp8.onrender.com/movies",{
               method: "GET",
               headers: {Authorization: `Bearer ${token}`},
        })
          .then((response) => response.json())
          .then((movies) => {
            console.log("movies from api:", movies);
           
            const moviesFromApi = movies.map((movie) => {
                const oldGenre = Object.entries(movie.Genre).map(([key, value]) => ([
                  <div key={movie._id}>{key} : {value}</div>
                ]));

            const genre = [...oldGenre];
                
                
            const oldDirector = Object.entries(movie.Director).map(([key,  value]) => ([
                <div key={movie._id}>{key} : {value}</div>
                ]));
            const director = [...oldDirector];

                
                return {
                  id: movie._id,
                  image: movie.ImagePath,
                  title: movie.Title,
                  description: movie.Description,
                  genre,

                  actors: movie.Actors,
                  director
                };
              });
              
            setMovies(moviesFromApi);
            console.log("movie data",moviesFromApi);
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
        {username? (
          <NavigationBar
          username={username}
          onLoggedOut={()=>{
            storedUsername=null;
            setToken=null;
            localStorage.clear();
          }}
          />
        ) : (
          ""
        )}
        <Routes>
          <Route
            path="/signup"
            element={
              <React.Fragment>
                {username? <Navigate to="/" /> : <SignupView />}
              </React.Fragment>
            }
          />

          <Route
            path="/login"
            element={
              <React.Fragment>
                {username? (
                  <Navigate to="/" />
                ):(
                  <LoginView
                   onLoggedIn={(username,token) =>{
                    setUsername(username);
                    setToken(token);
                   }}
                  />
                )}
              </React.Fragment>
            }
          />
        
        <Route
           path="/"
           element={
            <React.Fragment>
              {!username? (
                <Navigate to="/login" />
              ) : movies.lenth === 0?(
                <Col>Hold on! We are fetching the best movies for you.</Col>
              ):(
                <Row className="justify-content-center py-5">
                  {movies.map((movie) => (
                    <MovieCard
                     movie={movie}
                     hasFavorite={favoriteMovies.includes(movie)}
                     toggleFavorite={toggleFavorite}
                     key={movie.id}
                  />
                     
               ))}
            </Row>
            )}
            </React.Fragment>
           }
         />

        <Route
           path="/profile"
           element={
            <React.Fragment>
              {username? (
                <ProfileView
                user={user}
                favoriteMovies={favoriteMovies}
                toggleFavorite={toggleFavorite}
                token={token}
                />
              ):(
                <Navigate to="/login" />
              )}
            </React.Fragment>
           }
          />

        <Route
                  path="/movies/:movieId"
                  element={
                    <React.Fragment>
                      {!username ? (
                        <Navigate to="/login" />
                      ) : movies.length === 0 ? (
                        <Col>Hold on! We are fetching the best movies for you.</Col>
                      ) : (
                        <Row className="justify-content-center py-5">
                          <Col md={8} className="mb-5">
                            <MovieView movies={movies} />
                          </Col>
                          
                        </Row>
                      )}
                    </React.Fragment>
                  }
                />
                
        </Routes>
       </BrowserRouter>
    );
  };
