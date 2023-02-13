// import { useState, useEffect } from "react";
// import { MovieCard } from "../movie-card/movie-card";
// import { MovieView} from "../movie-view/movie-view";

// export const MainView = () => {
    
//     const [movies, setMovies] = useState([]);

//     const [selectedMovie, setSelectedMovie] = useState(null);

//     useEffect(() => {
//         fetch("https://myflix-gqp8.onrender.com/movies")
//           .then((response) => response.json())
//           .then((data) => {
//             console.log("movies from api:", data);
           
//             const moviesFromApi = data.map((movie) => {
//                 const oldGenre = Object.entries(movie.Genre).map(([key, value]) => ([
//                   <div key={movie._id}>{key} : {value}</div>
//                 ]));

//                 const genre = [...oldGenre];
                    
                    
//                 const oldDirector = Object.entries(movie.Director).map(([key,  value]) => ([
//                     <div key={movie._id}>{key} : {value}</div>
//                     ]));
//                 const director = [...oldDirector];

                
//                 return {
                
//                   id: movie._id,
//                   image: movie.ImagePath,
//                   title: movie.Title,
//                   description: movie.Description,
//                   genre,
//                   actors: movie.Actors,
//                   director
//                 };
//               });
              
//             setMovies(moviesFromApi);
//             console.log("movie data",moviesFromApi);
//           });
//       }, []);

//     if(selectedMovie){
//         return (
//             <MovieView 
//             movie={selectedMovie}
//             key={selectedMovie.id}
//             onBackClick={() => setSelectedMovie(null)} > </MovieView>
//         )
//     }

//     if(movies.length === 0){
//         return <div>The list is empty!</div>
//     }

//     return(
//         <div>
//             {movies.map((movie) => (
//                <MovieCard
//                 key={movie.id}
//                 movie={movie}
//                 onMovieClick={(newSelectedMovie) => {
//                     setSelectedMovie(newSelectedMovie);
//                 }}>
//                 </MovieCard>
//             ))}
//         </div>
//     );
// };


import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView} from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);


    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

       

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




      

    return (
      <Row className="justify-content-md-center">
        {!user?(
          
          <Col md={5}>
          <LoginView onLoggedIn={(user, token)=> {setUser(user); setToken(token)}}></LoginView>
             or
          <SignupView></SignupView>
          </Col>
          
        ) : selectedMovie? (
          <Col md={8}>
          <MovieView
          style={{border:"1px solid green"}}
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}>
          </MovieView>
          </Col>
        ) : movies.length === 0? (
          <div>The list is empty!</div>
        ) : (
          <>
          {movies.map((movie) => (
          <Col className="mb-5" key={movie.id} md={3}>
          <MovieCard
           movie={movie}
           onMovieClick={(newSelectedMovie) => {
           setSelectedMovie(newSelectedMovie);
          }}
          >
          </MovieCard>
          </Col>
          ))}
          <button onClick={() => {setUser(null); setToken(null);localStorage.clear();}}>Logout</button>
          </>
        )}
      
      </Row>
      
    );
};