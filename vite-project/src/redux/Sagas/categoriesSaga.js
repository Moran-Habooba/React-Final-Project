import { takeEvery, select } from "redux-saga/effects";

function* saveCategoriesToLocalStorage() {
  const categories = yield select((state) => state.categories.categories);
  localStorage.setItem("categories", JSON.stringify(categories));
}

export default function* watchCategoryActions() {
  yield takeEvery(
    ["ADD_CATEGORY", "DELETE_CATEGORY", "UPDATE_CATEGORY"],
    saveCategoriesToLocalStorage
  );
}
