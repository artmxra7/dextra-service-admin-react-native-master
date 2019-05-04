/**
 * ---------------------------------------------------------------
 *
 *  Action Types
 *
 * ---------------------------------------------------------------
 */

export const SET_CURRENT_ORDER_ID = "SET_CURRENT_ORDER_ID";

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators
 *
 * ---------------------------------------------------------------
 */

export function setCurrentOrderID(orderID) {
  return {
    type: SET_CURRENT_ORDER_ID,
    payload: {
      orderID
    }
  };
}
