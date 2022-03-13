import { put, call, takeEvery, all, fork, select } from "redux-saga/effects";
import { useContext } from "react";
import { Host } from "../../utils/classes/Host";
import {
  startAttackFailed,
  startAttackPending,
} from "../action-creators/AttackProcess.creators";
import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
import { StartAttackPendingAction } from "../actions/AttackProcessActions";
import { store } from "../store";
import { RootState } from "../reducers/RootReducer";
import clone from "clone";
import { socket } from "../../context/socket";
import { SocketEvents } from "../../utils/enums/SocketEvents";
export const getDraftHosts = (state: RootState) => state.hosts.draftHosts;

function* onStartProcess({ payload }: StartAttackPendingAction) {
  try {
    yield call(socket.emit, SocketEvents.START_ATTACK, payload);
  } catch (error) {
    yield put(startAttackFailed());
  }
}

// Bắt update host pending event
function* watchOnStartAttack() {
  yield takeEvery(
    AttackProcessActionTypes.START_ATTACK_PENDING,
    onStartProcess
  );
}

export default function* hostsSaga() {
  yield all([fork(watchOnStartAttack)]);
}
