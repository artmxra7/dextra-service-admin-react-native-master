import {
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    SET_CART_ITEM_QUANTITY,
    SET_CART_ITEM_TYPE,
    CLEAR_CART,
} from './Actions';

export default function carts(state = [], action) {
    let index = 0;

    switch (action.type) {
        case ADD_CART_ITEM:
            return [
                ...state,
                action.product
            ];
        case REMOVE_CART_ITEM:
            return state.filter((item) => {
                return item.id != action.productID;
            });
        case SET_CART_ITEM_QUANTITY:
            return state.map((item) => {
                if (item.id == action.productID) {
                    return {
                        ...item,
                        quantity: action.quantity
                    };
                }

                return item;
            });
        case SET_CART_ITEM_TYPE:
            return state.map((item) => {
                if (item.id == action.productID) {
                    return {
                        ...item,
                        selected_type: action.selectedType
                    };
                }

                return item;
            });
        case CLEAR_CART:
            return [];
        default:
            return state;
    }
}