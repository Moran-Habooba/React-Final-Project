import { takeEvery, select } from "redux-saga/effects";

function* saveProductsToLocalStorage() {
  const products = yield select((state) => state.products.products);
  localStorage.setItem("products", JSON.stringify(products));
}

export default function* watchProductActions() {
  yield takeEvery(
    ["ADD_PRODUCT", "DELETE_PRODUCT", "UPDATE_PRODUCT", "UPDATE_STOCK"],
    saveProductsToLocalStorage
  );
}
