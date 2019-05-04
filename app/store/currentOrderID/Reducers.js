import { SET_CURRENT_ORDER_ID } from "./Actions";

export default function currentOrderID(state = null, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_ORDER_ID:
      return payload.orderID;
    default:
      return state;
  }
}
