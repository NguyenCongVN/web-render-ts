import { put, call, takeEvery, all, fork, select } from "redux-saga/effects";
import { Host } from "../../utils/classes/Host";
import { startAttackPending } from "../action-creators/AttackProcess.creators";
import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
import { StartAttackPendingAction } from "../actions/AttackProcessActions";
import { store } from "../store";
import { RootState } from "../reducers/RootReducer";
import clone from "clone";
export const getDraftHosts = (state: RootState) => state.hosts.draftHosts;

// function StartAttackProcess(hosts: Host[]): boolean {
//   const state = store.getState();
//   let isStartAttackProcessSuccess = false;
//   for (var i = 0; i < state.hosts.hosts.length; i++) {
//     if (state.hosts.hosts[i].isAttacker) {
//       state.hosts.hosts[i] = hostToUpdate;
//       isUpdateSuccess = true;
//       break;
//     }
//   }
//   if (isUpdateSuccess) {
//     return state.hosts.hosts;
//   } else {
//     return null;
//   }
// }

// function* onStartProcess({ payload }: StartAttackPendingAction) {
//   try {
//     let result: Host[] | null = yield call(UpdateHosts, payload);
//     if (result) {
//       yield put(updateHostSuccess(result));
//     } else {
//       yield put(updateHostFailed());
//     }
//   } catch (error) {
//     yield put(updateHostFailed());
//   }
// }

// Bắt update host pending event
// function* watchOnUpdateHost() {
//   yield takeEvery(
//     AttackProcessActionTypes.START_ATTACK_PENDING,
//     onStartProcess
//   );
// }

export default function* hostsSaga() {
  // yield all([fork(watchOnUpdateHost)]);
}
