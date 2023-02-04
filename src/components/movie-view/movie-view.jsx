// export const MovieView = ({movie, onBackClick}) => {

//     return (
//             <div>
//             <div>
//                 <img src={movie.ImagePath} alt="Movie" />
//             </div>
//             <div>
//                 <span>Title: </span>
//                 <span>{movie.Title}</span>
//             </div>
//             <div>
//                 <span>Description</span>
//                 <span>{movie.Description}</span>
//             </div>
//             {/* <div>
//                 <span>Genre:</span>
//                 <span>{data.Genre}</span>
//             </div>
//             <div>
//                 <span>Director:</span>
//                 <span>{data.Director}</span>
//             </div>
//             <div>
//                 <span>Actors:</span>
//                 <span>{data.Actors}</span>
//             </div> */}

//             <button onClick={onBackClick}>Back</button>
//         </div>
//     );
// };

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div key={movie.id}>
        <div>
          <img src={movie.image} alt="movie" />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>ID: </span>
          <span>{movie.id}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre}</span>
        </div>
        <div>
          <span>Actors: </span>
          <span>{movie.actors}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };
  