/**
 * ---------------------------------------------------------------
 *
 *  Action Types
 *
 * ---------------------------------------------------------------
 */

export const SET_JOBS = "SET_JOBS";
export const SET_JOBS_LOADING = "SET_JOBS_LOADING";
export const CLEAR_JOBS = "CLEAR_JOBS";

/**
 * ---------------------------------------------------------------
 *
 *  Action Types for Action with Side Effects (from Redux Saga)
 *
 * ---------------------------------------------------------------
 */

export const FETCH_JOBS = "FETCH_JOBS";

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators
 *
 * ---------------------------------------------------------------
 */

export function setJobs(jobs) {
  return {
    type: SET_JOBS,
    payload: {
      jobs
    }
  };
}

export function setJobsLoading(isLoading) {
  return {
    type: SET_JOBS_LOADING,
    payload: {
      isLoading
    }
  };
}

export function clearJobs() {
  return {
    type: CLEAR_JOBS
  };
}

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators with Side Effects (from Redux Saga)
 *
 * ---------------------------------------------------------------
 */

export function fetchJobs() {
  return {
    type: FETCH_JOBS
  };
}
