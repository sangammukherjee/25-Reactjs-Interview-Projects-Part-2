import { useContext } from "react";
import { MovieContext } from "../context/GlobalState";

function MovieAlreadyWatched() {
  const { state, handleRemoveFromWatched } = useContext(MovieContext);

  return (
    <div className="movie-watched">
      <h1>Movie Watched</h1>
      <div className="watched-wrapper">
        {state.watched && state.watched.length > 0 ? (
          state.watched.map((movieItem) => (
            <div className="movie-card" key={movieItem.id}>
              <div className="img">
                {movieItem?.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movieItem.poster_path}`}
                  />
                ) : (
                  <div className="fill-img">No Image Available</div>
                )}
              </div>
              <div className="movie-info">
                <h3>{movieItem?.title}</h3>
                <h4>{movieItem?.release_date}</h4>
                <h4>Original Title: {movieItem?.original_title}</h4>
              </div>
              <div className="buttons-wrapper">
                <button onClick={()=> handleRemoveFromWatched(movieItem.id)}>Remove From Watched</button>
              </div>
            </div>
          ))
        ) : (
          <h1>No movie added in watched! Please add one</h1>
        )}
      </div>
    </div>
  );
}

export default MovieAlreadyWatched;
