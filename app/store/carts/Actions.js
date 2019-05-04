/**
 * ---------------------------------------------------------------
 *
 *  Action Types
 *
 * ---------------------------------------------------------------
 */

export const ADD_CART_ITEM = "ADD_CART_ITEM";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
export const SET_CART_ITEM_QUANTITY = "SET_CART_ITEM_QUANTITY";
export const SET_CART_ITEM_TYPE = "SET_CART_ITEM_TYPE";
export const CLEAR_CART = "CLEAR_CART";

/**
 * ---------------------------------------------------------------
 *
 *  Action Creators
 *
 * ---------------------------------------------------------------
 */

export function addCartItem(product) {
  return {
    type: ADD_CART_ITEM,
    product: {
      ...product,
      quantity: 1,
      selected_type: product.type
    }
  };
}

export function removeCartItem(productID) {
  return {
    type: REMOVE_CART_ITEM,
    productID
  };
}

export function setCartItemQuantity(productID, quantity) {
  return {
    type: SET_CART_ITEM_QUANTITY,
    productID,
    quantity
  };
}

export function setCartItemType(productID, selectedType) {
  return {
    type: SET_CART_ITEM_TYPE,
    productID,
    selectedType
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART
  };
}
