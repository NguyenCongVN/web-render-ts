import { all, fork } from "redux-saga/effects";
import HostSaga from "./HostsSaga";

export default function* rootSaga() {
  yield all([fork(HostSaga)]);
}
