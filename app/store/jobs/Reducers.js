import { SET_JOBS, SET_JOBS_LOADING, CLEAR_JOBS } from "./Actions";

export default function jobs(state = { data: [], isLoading: false }, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_JOBS:
      return {
        ...state,
        data: [...payload.jobs]
      };
    case SET_JOBS_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading
      };
    case CLEAR_JOBS:
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
}
