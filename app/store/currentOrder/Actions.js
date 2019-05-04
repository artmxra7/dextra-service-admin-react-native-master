/**
 * ---------------------------------------------------------------
 *
 *  Action Types
 *
 * ---------------------------------------------------------------
 */

export const SET_CURRENT_ORDER = "SET_CURRENT_ORDER";

/**
 * ---------------------------------------------------------------
 *
 *  Action Types for Action with Side Effects (from Redux Saga)
 *
 * ---------------------------------------------------------------
 */

export const FETCH_CURRENT_ORDER = "FETCH_CURRENT_ORDER";

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators
 *
 * ---------------------------------------------------------------
 */

export function setCurrentOrder(order) {
  return {
    type: SET_CURRENT_ORDER,
    payload: {
      order
    }
  };
}

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators with Side Effects (from Redux Saga)
 *
 * ---------------------------------------------------------------
 */

export function fetchCurrentOrder() {
  return {
    type: FETCH_CURRENT_ORDER
  };
}
