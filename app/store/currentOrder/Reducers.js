import { SET_CURRENT_ORDER } from "./Actions";

export default function currentOrder(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_ORDER:
      return payload.order;
    default:
      return state;
  }
}
