const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { productId, name, price, quantity } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { productId, name, price, quantity }],
        };
      }
    }
    case "REMOVE_FROM_CART": {
      const productId = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== productId
        ),
      };
    }
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    case "LOGOUT":
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
export default cartReducer;
