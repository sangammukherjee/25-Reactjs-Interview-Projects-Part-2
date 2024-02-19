import {
  ADD_MOVIE_TO_WATCHED,
  ADD_MOVIE_TO_WATCHLIST,
  MOVE_TO_WATCHED,
  REMOVE_MOVIE_FROM_WATCHED,
  REMOVE_MOVIE_FROM_WATCHLIST,
} from "../types";

export function Reducer(state, action) {
  switch (action.type) {
    case ADD_MOVIE_TO_WATCHLIST:
      return {
        ...state,
        watchList: [action.payload, ...state.watchList],
      };

    case ADD_MOVIE_TO_WATCHED:
      console.log(action, "action");
      return {
        ...state,
        watched: [action.payload, ...state.watched],
      };

    case REMOVE_MOVIE_FROM_WATCHLIST:
      return {
        ...state,
        watchList: state.watchList.filter(
          (movieItem) => movieItem.id !== action.payload
        ),
      };

    case REMOVE_MOVIE_FROM_WATCHED:
      return {
        ...state,
        watched: state.watched.filter(
          (movieItem) => movieItem.id !== action.payload
        ),
      };

    case MOVE_TO_WATCHED:
      return {
        ...state,
        watchList: state.watchList.filter(
          (movieItem) => movieItem.id !== action.payload.id
        ),
        watched: [action.payload, ...state.watched],
      };

    default:
      return state;
  }
}
