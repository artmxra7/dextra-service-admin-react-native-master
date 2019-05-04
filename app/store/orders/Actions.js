/**
 * ---------------------------------------------------------------
 *
 *  Action Types
 *
 * ---------------------------------------------------------------
 */

export const SET_ORDERS = "SET_ORDERS";
export const SET_ORDERS_LOADING = "SET_ORDERS_LOADING";
export const CLEAR_ORDERS = "CLEAR_ORDERS";

/**
 * ---------------------------------------------------------------
 *
 *  Action Types for Action with Side Effects (from Redux Saga)
 *
 * ---------------------------------------------------------------
 */

export const FETCH_ORDERS = "FETCH_ORDERS";

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators
 *
 * ---------------------------------------------------------------
 */

export function setOrders(orders) {
  return {
    type: SET_ORDERS,
    payload: {
      orders
    }
  };
}

export function setOrdersLoading(isLoading) {
  return {
    type: SET_ORDERS_LOADING,
    payload: {
      isLoading
    }
  };
}

export function clearOrders() {
  return {
    type: CLEAR_ORDERS
  };
}

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators with Side Effects (from Redux Saga)
 *
 * ---------------------------------------------------------------
 */

export function fetchOrders() {
  return {
    type: FETCH_ORDERS
  };
}
