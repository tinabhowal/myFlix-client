import React from 'react'
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({favoriteMovies, toggleFavorite}) => {

const handleToggle = (movie) => {
        toggleFavorite(movie);
    };
    return (
    <div>
    <div className="movie-list">
                    {favoriteMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            toggleFavorite={handleToggle}
                            hasFavorite={true}
                            
                        />    

                    ))}
    </div>
    </div>
  )
};