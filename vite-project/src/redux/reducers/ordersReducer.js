const defaultOrders = [
  {
    orderId: "1",
    userId: "2",
    items: [
      { productId: 1, name: "iPhone", quantity: 2, price: 3500 },
      { productId: 2, name: "Nintendo", quantity: 1, price: 1000 },
    ],
    totalPrice: 8000,
    date: "15.7.2024",
  },
];
const storedOrders = JSON.parse(localStorage.getItem("orders"));
const initialState = {
  orders:
    storedOrders && storedOrders.length > 0 ? storedOrders : defaultOrders,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ORDER": {
      const updatedOrders = [...state.orders, action.payload];
      return {
        ...state,
        orders: updatedOrders,
      };
    }

    default:
      return state;
  }
};
export default orderReducer;
