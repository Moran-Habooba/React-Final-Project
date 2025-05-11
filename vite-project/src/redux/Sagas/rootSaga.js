import { all } from "redux-saga/effects";
import productsSaga from "./productsSaga";
import ordersSaga from "./ordersSaga";
import cartSaga from "./cartSaga";
import usersSaga from "./usersSaga";
import categoriesSaga from "./categoriesSaga";

export default function* rootSaga() {
  yield all([
    productsSaga(),
    ordersSaga(),
    cartSaga(),
    usersSaga(),
    categoriesSaga(),
  ]);
}
