import { useSelector } from "react-redux";
import { put, call, takeEvery, all, fork, select } from "redux-saga/effects";
import { Host } from "../../utils/classes/Host";
import { Vulnerbility } from "../../utils/classes/Vulnerbility";
import { AddVulnerbilityPayload } from "../payload-types/HostPayloadTypes";
import {
  SetDraftHost,
  setHosts,
  updateDraftHostFailed,
  updateDraftHostPending,
  updateDraftHostSuccess,
  updateHostFailed,
  updateHostPending,
  updateHostSuccess,
  ToogleOpenAlert,
  addVulnerbilityPending,
  addVulnerbilitySuccess,
  addVulnerbilityFailed,
  removeVulnerbilitySuccess,
  removeVulnerbilityFailed,
} from "../action-creators/Host.creators";
import { HostActionTypes } from "../action-types/Host.types";
import {
  AddVulnerbilityPendingAction,
  RemoveVulnerbilityPendingAction,
  UpdateDraftHostPendingAction,
  UpdateHostPendingAction,
} from "../actions/Host.actions";
import { store } from "../store";
import { RootState } from "../reducers/RootReducer";
import clone from "clone";
export const getDraftHosts = (state: RootState) => state.hosts.draftHosts;

function UpdateHosts(hostToUpdate: Host): Host[] | null {
  const state = store.getState();
  let isUpdateSuccess = false;
  for (var i = 0; i < state.hosts.draftHosts.length; i++) {
    if (state.hosts.hosts[i].node_id === hostToUpdate.node_id) {
      state.hosts.hosts[i] = hostToUpdate;
      isUpdateSuccess = true;
      break;
    }
  }
  if (isUpdateSuccess) {
    return state.hosts.hosts;
  } else {
    return null;
  }
}

function* onUpdateHosts({ payload }: UpdateHostPendingAction) {
  try {
    // Trả lại update host pending
    let result: Host[] | null = yield call(UpdateHosts, payload);
    if (result) {
      yield put(updateHostSuccess(result));
    } else {
      yield put(updateHostFailed());
    }
  } catch (error) {
    yield put(updateHostFailed());
  }
}

// Bắt update host pending event
function* watchOnUpdateHost() {
  yield takeEvery(HostActionTypes.UPDATE_HOST_PENDING, onUpdateHosts);
}

function UpdateDraftHosts(hostToUpdate: Host): Host[] | null {
  const state = store.getState();
  let isUpdateSuccess = false;
  for (var i = 0; i < state.hosts.draftHosts.length; i++) {
    if (state.hosts.draftHosts[i].node_id === hostToUpdate.node_id) {
      state.hosts.draftHosts[i] = hostToUpdate;
      isUpdateSuccess = true;
      break;
    }
  }
  if (isUpdateSuccess) {
    return state.hosts.hosts;
  } else {
    return null;
  }
}

function* onUpdateDraftHosts({ payload }: UpdateHostPendingAction) {
  try {
    // Trả lại update host pending
    let result: Host[] | null = yield call(UpdateDraftHosts, payload);
    if (result) {
      yield put(updateDraftHostSuccess(result));
    } else {
      yield put(updateDraftHostFailed());
    }
  } catch (error) {
    yield put(updateDraftHostFailed());
  }
}

// Bắt update draft host pending event
function* watchOnUpdateDraftHost() {
  yield takeEvery(
    HostActionTypes.UPDATE_DRAFT_HOST_PENDING,
    onUpdateDraftHosts
  );
}

function AddVulnerbility(
  { host, vulnerbility }: AddVulnerbilityPayload,
  draftHosts: Host[]
): Host[] | null {
  let vulns = clone(vulnerbility);
  let isUpdateSuccess = false;
  for (var i = 0; i < draftHosts.length; i++) {
    if (draftHosts[i].node_id === host.node_id) {
      vulns.id = draftHosts[i].Vulnerbilities.length.toString();
      console.log(draftHosts[i].Vulnerbilities);
      draftHosts[i].Vulnerbilities.push(vulns);
      console.log(draftHosts[i].Vulnerbilities);
      isUpdateSuccess = true;
      break;
    }
  }
  if (isUpdateSuccess) {
    return draftHosts;
  } else {
    return null;
  }
}

function* onAddVulnerbility({ payload }: AddVulnerbilityPendingAction) {
  try {
    // Trả lại update host pending
    let draftHosts: Host[] = yield select(getDraftHosts);
    let result: Host[] | null = yield call(
      AddVulnerbility,
      payload,
      draftHosts
    );
    console.log(result);
    if (result) {
      yield put(addVulnerbilitySuccess(result));
    } else {
      yield put(addVulnerbilityFailed());
    }
  } catch (error) {
    yield put(addVulnerbilityFailed());
  }
}

// Bắt update draft host pending event
function* watchOnAddVulnerbility() {
  yield takeEvery(HostActionTypes.ADD_VULNERBILITY_PENDING, onAddVulnerbility);
}

// function RemoveVulnerbility({
//   host,
//   vulnerbility,
// }: AddVulnerbilityPayload): Host[] | null {
//   const state = store.getState();
//   let isUpdateSuccess = false;
//   for (var i = 0; i < state.hosts.draftHosts.length; i++) {
//     if (state.hosts.draftHosts[i].node_id === host.node_id) {
//       state.hosts.draftHosts[i].Vulnerbilities.filter(
//         (vuln) => vuln.id === vulnerbility.id
//       );
//       isUpdateSuccess = true;
//     }
//   }

//   if (isUpdateSuccess) {
//     return state.hosts.hosts;
//   } else {
//     return null;
//   }
// }

function* onRemoveVulnerbility({ payload }: RemoveVulnerbilityPendingAction) {
  try {
    // // Trả lại update host pending
    // let result: Host[] | null = yield call(RemoveVulnerbility, payload);
    // if (result) {
    //   yield put(removeVulnerbilitySuccess(result));
    // } else {
    //   yield put(removeVulnerbilityFailed());
    // }
  } catch (error) {
    yield put(removeVulnerbilityFailed());
  }
}

// Bắt update draft host pending event
function* watchOnRemoveVulnerbility() {
  yield takeEvery(
    HostActionTypes.REMOVE_VULNERBILITY_PENDING,
    onRemoveVulnerbility
  );
}

export default function* hostsSaga() {
  yield all([
    fork(watchOnUpdateHost),
    fork(watchOnUpdateDraftHost),
    fork(watchOnAddVulnerbility),
    fork(watchOnRemoveVulnerbility),
  ]);
}
