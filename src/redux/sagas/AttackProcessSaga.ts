import { put, call, takeEvery, all, fork, select } from "redux-saga/effects";
import {
  startAttackFailed,
  startAttackSuccess,
} from "../action-creators/AttackProcess.creators";
import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
import {
  AddDetailProcessAction,
  ScanningSuccessAction,
  StartAttackPendingAction,
} from "../actions/AttackProcessActions";
import { store } from "../store";
import { RootState } from "../reducers/RootReducer";
import clone from "clone";
import { socket } from "../../context/socket";
import { SocketEvents } from "../../utils/enums/SocketEvents";
import {
  AddDetailPayload,
  ScanSuccessPayload,
  StartAttackPendingPayload,
} from "../payload-types/AttackProcessPayloadTypes";
import {
  IndividualAttackState,
  IndividualAttackStatus,
} from "../reducers/AttackProcessReducer";
import { Host } from "../../utils/classes/Host";
export const getAttackProcesses = (state: RootState) =>
  state.attackProcess.processes;
export const getHostStates = (state: RootState) => state.hosts.hosts;

function initialAttackProcess(
  hosts: Host[],
  processes: IndividualAttackState[],
  scanReports: { hostLabel: string; reportId: string | undefined }[]
) {
  for (var i = 0; i < hosts.length; i++) {
    // eslint-disable-next-line no-loop-func
    if (scanReports.length > 0) {
      // eslint-disable-next-line no-loop-func
      scanReports.forEach((report) => {
        if (report.hostLabel === hosts[i].label.text) {
          processes.push({
            hostLable: hosts[i].label.text,
            meterpreterGot: [],
            progress: [],
            scanReportId: report.reportId,
            shellNumberGot: [],
          });
        }
      });
    } else {
      if (!hosts[i].IsRouter && !hosts[i].IsSwitch && !hosts[i].isAttacker)
        processes.push({
          hostLable: hosts[i].label.text,
          meterpreterGot: [],
          progress: [],
          scanReportId: undefined,
          shellNumberGot: [],
        });
    }
  }

  console.log(processes);
}

function emitStartAttack(payload: StartAttackPendingPayload) {
  if (socket !== undefined) {
    return new Promise((resolve) => {
      //@ts-ignore
      socket.emit(
        SocketEvents.START_ATTACK,
        payload,
        (responseStatus: string) => {
          resolve(responseStatus);
        }
      );
    });
  }
}

// Start attack
function* onStartProcess({ payload }: StartAttackPendingAction): any {
  try {
    const responseStatus = yield call(emitStartAttack, payload);
    console.log(responseStatus);
    if (responseStatus === "OK") {
      const hostState: Host[] = yield select(getHostStates);
      const processes: IndividualAttackState[] = yield select(
        getAttackProcesses
      );
      yield call(
        initialAttackProcess,
        hostState,
        processes,
        payload.scanReportId
      );
      yield put(startAttackSuccess());
    }
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

// Add Data

function addDataForHost(
  payload: AddDetailPayload,
  processes: IndividualAttackState[]
) {
  for (var i = 0; i < processes.length; i++) {
    if (processes[i] && processes[i].hostLable === payload.hostLabel) {
      processes[i].progress.push({
        time: new Date(),
        detail: payload.Detail,
        status: payload.Status,
      });
    }
  }
}

function* onAddData({ payload }: AddDetailProcessAction): any {
  try {
    if (payload.hostLabel !== "ALL") {
      const processes = yield select(getAttackProcesses);
      yield call(addDataForHost, payload, processes);
    }
  } catch (error) {}
}

// Bắt update host pending event
function* watchOnAddData() {
  yield takeEvery(AttackProcessActionTypes.ADD_DETAIL_PROCESS, onAddData);
}

// Scanning

function addAllScanning(processes: IndividualAttackState[]) {
  for (var i = 0; i < processes.length; i++) {
    processes[i].progress.push({
      time: new Date(),
      detail: "Scanning",
      status: IndividualAttackStatus.scanning,
    });
  }
}

function* onScanning(): any {
  try {
    const processes = yield select(getAttackProcesses);
    yield call(addAllScanning, processes);
  } catch (error) {}
}

function* watchOnScanning() {
  yield takeEvery(AttackProcessActionTypes.START_SCANING, onScanning);
}

function addScanSuccessHost(
  payload: ScanSuccessPayload,
  processes: IndividualAttackState[]
) {
  for (var i = 0; i < processes.length; i++) {
    if (processes[i].hostLable === payload.hostLabel) {
      processes[i].progress.push({
        time: new Date(),
        detail: "Scan Successfully",
        status: IndividualAttackStatus.scanfinish,
      });

      processes[i].scanReportId = payload.reportId;
    }
  }
}

function* onScanSuccess({ payload }: ScanningSuccessAction): any {
  try {
    const processes = yield select(getAttackProcesses);
    yield call(addScanSuccessHost, payload, processes);
  } catch (error) {}
}

function* watchOnScanSuccess() {
  yield takeEvery(AttackProcessActionTypes.SCANING_SUCCESS, onScanSuccess);
}

export default function* attackProcessesSaga() {
  yield all([fork(watchOnStartAttack)]);
  yield all([fork(watchOnAddData)]);
  yield all([fork(watchOnScanning)]);
  yield all([fork(watchOnScanSuccess)]);
}
