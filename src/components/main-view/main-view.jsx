import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView} from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://myflix-gqp8.onrender.com/movies")
          .then((response) => response.json())
          .then((data) => {
            console.log("movies from api:", data);
           
            const moviesFromApi = data.map((movie) => {
                const oldGenre = Object.entries(movie.Genre).map(([key, value]) => ([
                  <div>{key} : {value}</div>
                ]));

            const genre = [...oldGenre];
                
                
            const oldDirector = Object.entries(movie.Director).map(([key,  value]) => ([
                <div>{key} : {value}</div>
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
      }, []);

    if(selectedMovie){
        return (
            <MovieView 
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)} />
        )
    }

    if(movies.length === 0){
        return <div>The list is empty!</div>
    }

    return(
        <div>
            {movies.map((movie) => (
               <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}               

                />
            ))}
        </div>
    );
};
