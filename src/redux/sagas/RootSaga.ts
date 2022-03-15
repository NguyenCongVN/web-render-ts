import { all, fork } from "redux-saga/effects";
import HostSaga from "./HostsSaga";
import AttackProcessesSaga from "./AttackProcessSaga";

export default function* rootSaga() {
  yield all([fork(HostSaga), fork(AttackProcessesSaga)]);
}
