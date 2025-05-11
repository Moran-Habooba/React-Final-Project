import { takeEvery, select } from "redux-saga/effects";

function* saveCartItemsToLocalStorage() {
  const cartItems = yield select((state) => state.cart.cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function* clearCartFromLocalStorage() {
  localStorage.removeItem("cartItems");
}

export default function* cartSaga() {
  yield takeEvery(
    ["ADD_TO_CART", "REMOVE_FROM_CART", "CLEAR_CART"],
    saveCartItemsToLocalStorage
  );
  yield takeEvery(["LOGOUT"], clearCartFromLocalStorage);
}
