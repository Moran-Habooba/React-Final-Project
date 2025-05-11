import { takeEvery, select } from "redux-saga/effects";

function* saveUsersAndCurrentUserToLocalStorage() {
  const users = yield select((state) => state.auth.users);
  const currentUser = yield select((state) => state.auth.currentUser);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function* clearCurrentUserFromLocalStorage() {
  localStorage.removeItem("currentUser");
}

export default function* usersSaga() {
  yield takeEvery(
    ["REGISTER", "UPDATE_USER", "LOGIN"],
    saveUsersAndCurrentUserToLocalStorage
  );
  yield takeEvery(["LOGOUT"], clearCurrentUserFromLocalStorage);
}
