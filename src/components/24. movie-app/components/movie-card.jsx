import { useContext } from "react";
import { MovieContext } from "../context/GlobalState";

function MovieCard({ movieItem, key }) {
  const { handleAddMovieToWatchList, handleAddMovieToWatched, state } =
    useContext(MovieContext);
  return (
    <div className="movie-card" key={key}>
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
        <button
          disabled={
            state.watchList.findIndex((item) => item.id === movieItem.id) > -1
              ? true
              : false
          }
          onClick={() => handleAddMovieToWatchList(movieItem)}
        >
          Add to Watchlist
        </button>
        <button disabled={state.watched.findIndex(item=> item.id === movieItem.id) >-1 ? true : false} onClick={() => handleAddMovieToWatched(movieItem)}>
          Add to Watched
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
