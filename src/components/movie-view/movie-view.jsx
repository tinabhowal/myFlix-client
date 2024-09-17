import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Carousel, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = () => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const movies = useSelector((state) => state.movies.list);

  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };
  
  useEffect(() => {
    if (movie) {
      const filteredMovies = movies.filter((m) => m.genre.Name === movie.genre.Name && m.id !== movieId);
      setSimilarMovies(chunkArray(filteredMovies, 3));
    }
  }, [movie, movies, movieId]);
  return (
    <div>
      {/* <div>
        <img src={movie.image} alt="movie" className="w-100 h-75" />
      </div>
      <div>
        <p><span>Title: </span><span>{movie.title}</span></p>
      </div>
      <div>
        <p><span>ID: </span><span>{movie.id}</span></p>
      </div>
      <div>
        <p><span>Description: </span><span>{movie.description}</span></p>
      </div>
      <div>
        <span>Genre: </span><span>{movie.genre.Name}</span>
        <p><span>{movie.genre.Description}</span></p>
      </div>
      <div>
        <span>Actors: </span>
        <p><span>{movie.actors}</span></p>
      </div>
      <div>
        <span>Director: </span><span>{movie.director.Name}</span>
        <p><span>Bio: </span><span>{movie.director.Bio}</span></p>
        <p><span>Birthyear: </span><span>{movie.director.Birth}</span></p>
        <p><span>Deathyear: </span><span>{movie.director.Death}</span></p>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link> */}





<Row>
        <Col>
          <img src={movie.image} alt="movie poster" className="w-100 h-100" />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h2>{movie.title}</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12} md={9}>
          <p><strong>Description:</strong> {movie.description}</p>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12} md={3}>
          <p><strong>Genre:</strong> {movie.genre.Name}</p>
        </Col>
        <Col xs={12} md={9}>
          <p>{movie.genre.Description}</p>
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col xs={12} md={3}>
          <p><strong>Director:</strong> {movie.director.Name}</p>
        </Col>
        <Col xs={12} md={9}>
          <p><strong>Bio:</strong> {movie.director.Bio}</p>
          <p><strong>Birthyear:</strong> {movie.director.Birth}</p>
          {movie.director.Death && (<p><strong>Deathyear:</strong> {movie.director.Death}</p>)}  
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={3}>
          <p><strong>Actors:</strong></p>
          <ul>
            {movie.actors && movie.actors.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
        </Col>
      </Row>
      

      <div className="similarMovies">
        <h3>Similar Movies</h3>
        {similarMovies.length > 0 ? (
          <Carousel>
          {similarMovies.map((movieChunk, idx) => (
            <Carousel.Item key={idx}>
              <div className="d-flex justify-content-around">
                {movieChunk.map((similarMovie) => (
                  <div key={similarMovie.id} className="similar-movie">
                    <Link to={`/movies/${encodeURIComponent(similarMovie.id)}`}>
                      <img src={similarMovie.image} alt="similar movie" className="w-100 h-75" />
                      <p><span>{similarMovie.title}</span></p>
                    </Link>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        ) : (
          <div>No similar movie found</div>
        )} 
      </div>

      <Row className="justify-content-center mb-3 mt-3">
        <Col xs='auto'>
          <Link to={`/`}>
            <Button size='lg'>Return to movie list</Button>
          </Link>
        </Col>
      </Row>

    </div>
  );
};







