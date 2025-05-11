import { takeEvery, select } from "redux-saga/effects";

function* saveOrdersToLocalStorage() {
  const orders = yield select((state) => state.orders.orders);
  localStorage.setItem("orders", JSON.stringify(orders));
}

export default function* watchOrderActions() {
  yield takeEvery(["ADD_ORDER"], saveOrdersToLocalStorage);
}
