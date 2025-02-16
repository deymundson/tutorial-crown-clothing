import { all, call } from "typed-redux-saga";
import { categoriesSaga } from "./categories";
import { userSaga } from "./user";

export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSaga)]);
}
