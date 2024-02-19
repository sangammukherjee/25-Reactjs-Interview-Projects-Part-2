import { createContext, useEffect, useReducer, useState } from "react";
import useDebounce from "../../22. debounce-api-call/use-debounce";
import { Reducer } from "./Reducer";
import {
  ADD_MOVIE_TO_WATCHED,
  ADD_MOVIE_TO_WATCHLIST,
  MOVE_TO_WATCHED,
  REMOVE_MOVIE_FROM_WATCHED,
  REMOVE_MOVIE_FROM_WATCHLIST,
} from "../types";

export const MovieContext = createContext(null);
const tmbi_api_key = "1eb6e1ca0a622b33a567cedd093542d4";

const initialState = {
  watchList: localStorage.getItem("watchList")
    ? JSON.parse(localStorage.getItem("watchList"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

function GlobalState({ children }) {
  const [searchMovieParam, setSearchMovieParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieSearchResults, setMovieSearchResults] = useState([]);

  const [state, dispatch] = useReducer(Reducer, initialState);

  const debouncedMovieSearchParamValue = useDebounce(searchMovieParam, 500);

  async function fetchListOfMovies() {
    try {
      setLoading(true);
      const apiResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${tmbi_api_key}&query=${debouncedMovieSearchParamValue}&include_adult=false&language=en-US&page=1`
      );
      const result = await apiResponse.json();

      console.log(result, "result");

      if (result && result.results && result.results.length > 0) {
        setMovieSearchResults(result.results);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (debouncedMovieSearchParamValue !== "") fetchListOfMovies();
  }, [debouncedMovieSearchParamValue]);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(state.watchList));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  function handleAddMovieToWatchList(movie) {
    dispatch({
      type: ADD_MOVIE_TO_WATCHLIST,
      payload: movie,
    });
  }

  function handleAddMovieToWatched(movie) {
    dispatch({
      type: ADD_MOVIE_TO_WATCHED,
      payload: movie,
    });
  }

  function handleRemoveFromWatchList(id) {
    dispatch({
      type: REMOVE_MOVIE_FROM_WATCHLIST,
      payload: id,
    });
  }

  function handleRemoveFromWatched(id) {
    dispatch({
      type: REMOVE_MOVIE_FROM_WATCHED,
      payload: id,
    });
  }

  function handleMoveToWatched(movie) {
    dispatch({
      type: MOVE_TO_WATCHED,
      payload: movie,
    });
  }

  console.log(state, "state");

  return (
    <MovieContext.Provider
      value={{
        searchMovieParam,
        setSearchMovieParam,
        loading,
        movieSearchResults,
        handleAddMovieToWatchList,
        handleAddMovieToWatched,
        state,
        handleRemoveFromWatchList,
        handleRemoveFromWatched,
        handleMoveToWatched,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default GlobalState;
