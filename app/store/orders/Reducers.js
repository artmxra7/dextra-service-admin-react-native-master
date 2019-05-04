import { SET_ORDERS, SET_ORDERS_LOADING, CLEAR_ORDERS } from "./Actions";

export default function orders(state = { data: [], isLoading: false }, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ORDERS:
      return {
        ...state,
        data: [...payload.orders]
      };
    case SET_ORDERS_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
}
