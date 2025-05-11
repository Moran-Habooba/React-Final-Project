import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import ordersReducer from "./reducers/ordersReducer";
import cartReducer from "./reducers/cartReducer";
import productsReducer from "./reducers/productsReducer";
import categoriesReducer from "./reducers/categoriesReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  cart: cartReducer,
  products: productsReducer,
  categories: categoriesReducer,
});

export default rootReducer;
