import { put, call, takeEvery, all, fork, select } from "redux-saga/effects";
import { Host } from "../../utils/classes/Host";
import {
  AddBlackDirectionPayload,
  AddNfsExportedPayload,
  AddNfsMountedPayload,
  AddServicePayload,
  AddVulnerbilityPayload,
  RemoveBlackDirectionPayload,
  RemoveNfsExportedPayload,
  RemoveNfsMountedPayload,
  RemoveServicePayload,
} from "../payload-types/HostPayloadTypes";
import {
  updateDraftHostFailed,
  updateDraftHostSuccess,
  updateHostFailed,
  updateHostSuccess,
  addVulnerbilitySuccess,
  addVulnerbilityFailed,
  removeVulnerbilitySuccess,
  removeVulnerbilityFailed,
  addServiceSuccess,
  addServiceFailed,
  removeServiceSuccess,
  removeServiceFailed,
  addNfsMountedSuccess,
  addNfsMountedFailed,
  removeNfsMountedSuccess,
  removeNfsMountedFailed,
  addNfsExportedSuccess,
  addNfsExportedFailed,
  removeNfsExportedSuccess,
  removeNfsExportedFailed,
  addBlackDirectionSuccess,
  addBlackDirectionFailed,
  removeBlackDirectionSuccess,
  removeBlackDirectionFailed,
} from "../action-creators/Host.creators";
import { HostActionTypes } from "../action-types/Host.types";
import {
  AddBlackDirectionPendingAction,
  AddNfsExportedPendingAction,
  AddNfsMountedPendingAction,
  AddServicePendingAction,
  AddVulnerbilityPendingAction,
  RemoveBlackDirectionPendingAction,
  RemoveNfsExportedPendingAction,
  RemoveNfsMountedPendingAction,
  RemoveServicePendingAction,
  RemoveVulnerbilityPendingAction,
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
    // Tr??? l???i update host pending
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

// B???t update host pending event
function* watchOnUpdateHost() {
  yield takeEvery(HostActionTypes.UPDATE_HOST_PENDING, onUpdateHosts);
}

function UpdateDraftHosts(hostToUpdate: Host): Host[] | null {
  const state = store.getState();
  console.log(hostToUpdate);
  let isUpdateSuccess = false;
  for (var i = 0; i < state.hosts.draftHosts.length; i++) {
    if (state.hosts.draftHosts[i].node_id === hostToUpdate.node_id) {
      state.hosts.draftHosts[i] = hostToUpdate;
      isUpdateSuccess = true;
      break;
    }
  }
  if (isUpdateSuccess) {
    return clone(state.hosts.draftHosts);
  } else {
    return null;
  }
}

function* onUpdateDraftHosts({ payload }: UpdateHostPendingAction) {
  try {
    // Tr??? l???i update host pending
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

// B???t update draft host pending event
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
      draftHosts[i].Vulnerbilities.push(vulns);
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
    // Tr??? l???i update host pending
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

// B???t update draft host pending event
function* watchOnAddVulnerbility() {
  yield takeEvery(HostActionTypes.ADD_VULNERBILITY_PENDING, onAddVulnerbility);
}

function RemoveVulnerbility(
  { host, vulnerbility }: AddVulnerbilityPayload,
  draftHosts: Host[]
): Host[] | null {
  let isUpdateSuccess = false;
  for (var i = 0; i < draftHosts.length; i++) {
    if (draftHosts[i].node_id === host.node_id) {
      console.log(draftHosts[i]);
      draftHosts[i].Vulnerbilities = draftHosts[i].Vulnerbilities.filter(
        (vuln) => vuln.id !== vulnerbility.id
      );
      isUpdateSuccess = true;
    }
  }

  if (isUpdateSuccess) {
    return draftHosts;
  } else {
    return null;
  }
}

function* onRemoveVulnerbility({ payload }: RemoveVulnerbilityPendingAction) {
  try {
    // Tr??? l???i update host pending
    let draftHosts: Host[] = yield select(getDraftHosts);
    let result: Host[] | null = yield call(
      RemoveVulnerbility,
      payload,
      draftHosts
    );
    if (result) {
      yield put(removeVulnerbilitySuccess(result));
    } else {
      yield put(removeVulnerbilityFailed());
    }
  } catch (error) {
    yield put(removeVulnerbilityFailed());
  }
}

// B???t update draft host pending event
function* watchOnRemoveVulnerbility() {
  yield takeEvery(
    HostActionTypes.REMOVE_VULNERBILITY_PENDING,
    onRemoveVulnerbility
  );
}

//  Services
function AddService(
  { host, service }: AddServicePayload,
  draftHosts: Host[]
): Host[] | null {
  let temp = clone(service);
  let isUpdateSuccess = false;
  for (var i = 0; i < draftHosts.length; i++) {
    if (draftHosts[i].node_id === host.node_id) {
      temp.id = draftHosts[i].Services.length.toString();
      draftHosts[i].Services.push(temp);
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

function* onAddService({ payload }: AddServicePendingAction) {
  try {
    let draftHosts: Host[] = yield select(getDraftHosts);
    let result: Host[] | null = yield call(AddService, payload, draftHosts);
    if (result) {
      yield put(addServiceSuccess(result));
    } else {
      yield put(addServiceFailed());
    }
  } catch (error) {
    yield put(addServiceFailed());
  }
}

// B???t update draft host pending event
function* watchOnAddService() {
  yield takeEvery(HostActionTypes.ADD_SERVICE_PENDING, onAddService);
}

function RemoveService(
  { host, service }: RemoveServicePayload,
  draftHosts: Host[]
): Host[] | null {
  let isUpdateSuccess = false;
  for (var i = 0; i < draftHosts.length; i++) {
    if (draftHosts[i].node_id === host.node_id) {
      draftHosts[i].Services = draftHosts[i].Services.filter(
        (srv) => srv.id !== service.id
      );
      isUpdateSuccess = true;
    }
  }
  if (isUpdateSuccess) {
    return draftHosts;
  } else {
    return null;
  }
}

function* onRemoveService({ payload }: RemoveServicePendingAction) {
  try {
    let draftHosts: Host[] = yield select(getDraftHosts);
    let result: Host[] | null = yield call(RemoveService, payload, draftHosts);
    if (result) {
      yield put(removeServiceSuccess(result));
    } else {
      yield put(removeServiceFailed());
    }
  } catch (error) {
    yield put(removeServiceFailed());
  }
}

// B???t update draft host pending event
function* watchOnRemoveService() {
  yield takeEvery(HostActionTypes.REMOVE_SERVICE_PENDING, onRemoveService);
}

//  NFS Mounted
function AddNFSMounted(
  { host, nfsMounted }: AddNfsMountedPayload,
  draftHosts: Host[]
): Host[] | null {
  let temp = clone(nfsMounted);
  let isUpdateSuccess = false;
  for (var i = 0; i < draftHosts.length; i++) {
    if (draftHosts[i].node_id === host.node_id) {
      temp.id = draftHosts[i].NSFMounted.length.toString();
      draftHosts[i].NSFMounted.push(temp);
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

function* onAddNFSMounted({ payload }: AddNfsMountedPendingAction) {
  try {
    let draftHosts: Host[] = yield select(getDraftHosts);
    let result: Host[] | null = yield call(AddNFSMounted, payload, draftHosts);
    if (result) {
      yield put(addNfsMountedSuccess(result));
    } else {
      yield put(addNfsMountedFailed());
    }
  } catch (error) {
    yield put(addNfsMountedFailed());
  }
}

// B???t update draft host pending event
function* watchOnAddNFSMounted() {
  yield takeEvery(HostActionTypes.ADD_NFSMOUNTED_PENDING, onAddNFSMounted);
}

function RemoveNFSMounted(
  { host, nfsMounted }: RemoveNfsMountedPayload,
  draftHosts: Host[]
): Host[] | null {
  let isUpdateSuccess = false;
  for (var i = 0; i < draftHosts.length; i++) {
    if (draftHosts[i].node_id === host.node_id) {
      draftHosts[i].NSFMounted = draftHosts[i].NSFMounted.filter(
        (nfs) => nfs.id !== nfsMounted.id
      );
      isUpdateSuccess = true;
    }
  }
  if (isUpdateSuccess) {
    return draftHosts;
  } else {
    return null;
  }
}

function* onRemoveNFSMounted({ payload }: RemoveNfsMountedPendingAction) {
  try {
    let draftHosts: Host[] = yield select(getDraftHosts);
    let result: Host[] | null = yield call(
      RemoveNFSMounted,
      payload,
      draftHosts
    );
    if (result) {
      yield put(removeNfsMountedSuccess(result));
    } else {
      yield put(removeNfsMountedFailed());
    }
  } catch (error) {
    yield put(removeNfsMountedFailed());
  }
}

// B???t update draft host pending event
function* watchOnRemoveNFSMounted() {
  yield takeEvery(
    HostActionTypes.REMOVE_NFSMOUNTED_PENDING,
    onRemoveNFSMounted
  );
}

//  NFS Exported
function AddNFSExported(
  { host, nfsExported }: AddNfsExportedPayload,
  draftHosts: Host[]
): Host[] | null {
  let temp = clone(nfsExported);
  let isUpdateSuccess = false;
  for (var i = 0; i < draftHosts.length; i++) {
    if (draftHosts[i].node_id === host.node_id) {
      temp.id = draftHosts[i].NSFExportInfo.length.toString();
      draftHosts[i].NSFExportInfo.push(temp);
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

function* onAddNFSExported({ payload }: AddNfsExportedPendingAction) {
  try {
    let draftHosts: Host[] = yield select(getDraftHosts);
    let result: Host[] | null = yield call(AddNFSExported, payload, draftHosts);
    if (result) {
      yield put(addNfsExportedSuccess(result));
    } else {
      yield put(addNfsExportedFailed());
    }
  } catch (error) {
    yield put(addNfsExportedFailed());
  }
}

// B???t update draft host pending event
function* watchOnAddNFSExported() {
  yield takeEvery(HostActionTypes.ADD_NFSEXPORTED_PENDING, onAddNFSExported);
}

function RemoveNFSExported(
  { host, nfsExported }: RemoveNfsExportedPayload,
  draftHosts: Host[]
): Host[] | null {
  let isUpdateSuccess = false;
  for (var i = 0; i < draftHosts.length; i++) {
    if (draftHosts[i].node_id === host.node_id) {
      draftHosts[i].NSFExportInfo = draftHosts[i].NSFExportInfo.filter(
        (nfs) => nfs.id !== nfsExported.id
      );
      isUpdateSuccess = true;
    }
  }
  if (isUpdateSuccess) {
    return draftHosts;
  } else {
    return null;
  }
}

function* onRemoveNFSExported({ payload }: RemoveNfsExportedPendingAction) {
  try {
    let draftHosts: Host[] = yield select(getDraftHosts);
    let result: Host[] | null = yield call(
      RemoveNFSExported,
      payload,
      draftHosts
    );
    if (result) {
      yield put(removeNfsExportedSuccess(result));
    } else {
      yield put(removeNfsExportedFailed());
    }
  } catch (error) {
    yield put(removeNfsExportedFailed());
  }
}

// B???t update draft host pending event
function* watchOnRemoveNFSExported() {
  yield takeEvery(
    HostActionTypes.REMOVE_NFSEXPORTED_PENDING,
    onRemoveNFSExported
  );
}

// Add BlackDirection

function AddBlackDirection(
  { host, blackDirection }: AddBlackDirectionPayload,
  draftHosts: Host[]
): Host[] | null {
  let isUpdateSuccess = false;
  for (var i = 0; i < draftHosts.length; i++) {
    if (draftHosts[i].node_id === host.node_id) {
      blackDirection.id = host.BlackListDirections.length.toString();
      draftHosts[i].BlackListDirections.push(blackDirection);
      isUpdateSuccess = true;
    }
  }
  if (isUpdateSuccess) {
    return draftHosts;
  } else {
    return null;
  }
}

function* onAddBlackDirection({ payload }: AddBlackDirectionPendingAction) {
  try {
    let draftHosts: Host[] = yield select(getDraftHosts);
    let result: Host[] | null = yield call(
      AddBlackDirection,
      payload,
      draftHosts
    );
    if (result) {
      yield put(addBlackDirectionSuccess());
    } else {
      yield put(addBlackDirectionFailed());
    }
  } catch (error) {
    yield put(addBlackDirectionFailed());
  }
}

function* watchOnAddBlackDirection() {
  yield takeEvery(
    HostActionTypes.ADD_BLACK_DIRECTION_PENDING,
    onAddBlackDirection
  );
}

// Remove Black Direction
function RemoveBlackDirection(
  { host, blackDirection }: RemoveBlackDirectionPayload,
  draftHosts: Host[]
): Host[] | null {
  let isUpdateSuccess = false;
  for (var i = 0; i < draftHosts.length; i++) {
    if (draftHosts[i].node_id === host.node_id) {
      draftHosts[i].BlackListDirections = draftHosts[
        i
      ].BlackListDirections.filter((blackDirectionHost) => {
        return blackDirectionHost.id !== blackDirection.id;
      });
      isUpdateSuccess = true;
    }
  }

  if (isUpdateSuccess) {
    return draftHosts;
  } else {
    return null;
  }
}

function* onRemoveBlackDirection({
  payload,
}: RemoveBlackDirectionPendingAction) {
  try {
    let draftHosts: Host[] = yield select(getDraftHosts);
    let result: Host[] | null = yield call(
      RemoveBlackDirection,
      payload,
      draftHosts
    );
    if (result) {
      yield put(removeBlackDirectionSuccess());
    } else {
      yield put(removeBlackDirectionFailed());
    }
  } catch (error) {
    yield put(removeBlackDirectionFailed());
  }
}

function* watchOnRemoveBlackDirection() {
  yield takeEvery(
    HostActionTypes.REMOVE_BLACK_DIRECTION_PENDING,
    onRemoveBlackDirection
  );
}

export default function* hostsSaga() {
  yield all([
    fork(watchOnUpdateHost),
    fork(watchOnUpdateDraftHost),
    fork(watchOnAddVulnerbility),
    fork(watchOnRemoveVulnerbility),
    fork(watchOnAddService),
    fork(watchOnRemoveService),
    fork(watchOnAddNFSMounted),
    fork(watchOnRemoveNFSMounted),
    fork(watchOnAddNFSExported),
    fork(watchOnRemoveNFSExported),
    fork(watchOnAddBlackDirection),
    fork(watchOnRemoveBlackDirection),
  ]);
}
