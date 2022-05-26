import { put, takeEvery, fork, select, call, all } from "redux-saga/effects";
import {
  startAttackFailed,
  startAttackSuccess,
  sendCommandSuccess,
  sendCommandFailed,
  saveCommandSuccess,
  stopAttack,
  stopAttackSuccess,
} from "../action-creators/AttackProcess.creators";
import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
import {
  AddDetailProcessAction,
  GotMeterpreterAction,
  GotShellAction,
  ReceivedResponseAction,
  ScanningFailedAction,
  ScanningSuccessAction,
  SendCommandFailedAction,
  SendCommandPendingAction,
  SendCommandSuccessAction,
  StartAttackPendingAction,
  StopAttackAction,
} from "../actions/AttackProcessActions";
import { RootState } from "../reducers/RootReducer";
import { socket } from "../../context/socket";
import { SocketEvents } from "../../utils/enums/SocketEvents";
import {
  AddDetailPayload,
  FailedCommandPayload,
  GotMeterpreterPayload,
  GotShellPayload,
  ReceivedCommandPayload,
  ScanFailedPayload,
  ScanSuccessPayload,
  SendCommandPayload,
  StartAttackPendingPayload,
  SuccessCommandPayload,
} from "../payload-types/AttackProcessPayloadTypes";
import {
  AttackProcessState,
  CommandLine,
  IndividualAttackState,
  IndividualAttackStatus,
} from "../reducers/AttackProcessReducer";
import { Host } from "../../utils/classes/Host";
import { convertLabel } from "../../utils/file_utils/StringUtil";
import { CommandType } from "../../utils/enums/CommandType";
import clone from "clone";
import { v1 as uuidv1 } from "uuid";

export const getAttackProcesses = (state: RootState) =>
  state.attackProcess.processes;
export const getAttackProcessState = (state: RootState) => state.attackProcess;
export const getAttackProcessCommands = (state: RootState) =>
  state.attackProcess.commands;
export const getHostStates = (state: RootState) => state.hosts.hosts;

function initialAttackProcess(
  hosts: Host[],
  processes: IndividualAttackState[],
  scanReports: { hostLabel: string; reportId: string | undefined }[]
) {
  // processes = [];
  for (var i = 0; i < hosts.length; i++) {
    // eslint-disable-next-line no-loop-func
    if (scanReports.length > 0) {
      // eslint-disable-next-line no-loop-func
      scanReports.forEach((report) => {
        if (report.hostLabel === convertLabel(hosts[i].label.text)) {
          processes.push({
            hostLable: convertLabel(hosts[i].label.text),
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
          hostLable: convertLabel(hosts[i].label.text),
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

// Scan Failed

function addScanFailedHost(
  payload: ScanFailedPayload,
  processes: IndividualAttackState[]
) {
  for (var i = 0; i < processes.length; i++) {
    if (processes[i].hostLable === payload.hostLabel) {
      processes[i].progress.push({
        time: new Date(),
        detail: "Scan Failed",
        status: IndividualAttackStatus.scanfinish,
      });

      processes[i].scanReportId = undefined;
    }
  }
}

function* onScanFailed({ payload }: ScanningFailedAction): any {
  try {
    const processes = yield select(getAttackProcesses);
    yield call(addScanFailedHost, payload, processes);
  } catch (error) {}
}

function* watchOnScanFailed() {
  yield takeEvery(AttackProcessActionTypes.SCANING_FAILED, onScanFailed);
}

// Got Shell

function addShell(
  payload: GotShellPayload,
  processes: IndividualAttackState[],
  attackState: AttackProcessState
) {
  for (var i = 0; i < processes.length; i++) {
    if (processes[i].hostLable === payload.hostLabel) {
      processes[i].progress.push({
        time: new Date(),
        detail: "Got Shell",
        status: IndividualAttackStatus.gotShell,
      });

      processes[i].shellNumberGot.push(payload.shellId);

      attackState.commands[payload.shellId] = {
        type: CommandType.Shell,
        commandHistory: {},
        responseDialog: {},
        fullDialog: {},
      };
    }
  }
}

function* onGotShell({ payload }: GotShellAction): any {
  try {
    const processes = yield select(getAttackProcesses);
    const attackState = yield select(getAttackProcessState);
    yield call(addShell, payload, processes, attackState);
  } catch (error) {}
}

function* watchOnGotShell() {
  yield takeEvery(AttackProcessActionTypes.GOT_SHELL, onGotShell);
}

// Got Meterpreter

function addMeterpreter(
  payload: GotMeterpreterPayload,
  processes: IndividualAttackState[],
  attackState: AttackProcessState
) {
  for (var i = 0; i < processes.length; i++) {
    if (processes[i].hostLable === payload.hostLabel) {
      processes[i].progress.push({
        time: new Date(),
        detail: "Got Meterpreter",
        status: IndividualAttackStatus.gotMeterpreter,
      });

      processes[i].meterpreterGot.push(payload.meterpreterId);

      attackState.commands[payload.meterpreterId] = {
        type: CommandType.Meterpreter,
        commandHistory: {},
        responseDialog: {},
        fullDialog: {},
      };
    }
  }
}

function* onGotMeterpreter({ payload }: GotMeterpreterAction): any {
  try {
    const processes = yield select(getAttackProcesses);
    const attackState = yield select(getAttackProcessState);
    yield call(addMeterpreter, payload, processes, attackState);
  } catch (error) {}
}

function* watchOnGotMeterpreter() {
  yield takeEvery(AttackProcessActionTypes.GOT_METERPRETER, onGotMeterpreter);
}

// Send Command

function emitSendCommand(payload: SendCommandPayload) {
  if (socket !== undefined) {
    let isDone = false;
    return new Promise((resolve, reject) => {
      //@ts-ignore
      socket.emit(
        SocketEvents.SEND_COMMAND,
        payload,
        (responseStatus: string) => {
          isDone = true;
          resolve(responseStatus);
        }
      );
      setTimeout(() => {
        if (!isDone) {
          reject("Timeout");
        }
      }, 5000);
    });
  }
}

function addSendingCommand(
  { commandId, commandLine }: SendCommandPayload,
  attackState: AttackProcessState
) {
  try {
    let attackProcessCommandsClone = clone(attackState.commands);
    let commandLineId = uuidv1();
    attackProcessCommandsClone[commandId].commandHistory[`${commandLineId}c`] =
      commandLine;
    attackProcessCommandsClone[commandId].fullDialog[`${commandLineId}c`] =
      commandLine;
    return {
      attackCommands: attackProcessCommandsClone,
      commandLineId: commandLineId,
    };
  } catch (error) {
    return false;
  }
}

function* onSendCommand({ payload }: SendCommandPendingAction): any {
  const attackState = yield select(getAttackProcessState);
  let { attackCommands, commandLineId } = yield call(
    addSendingCommand,
    payload,
    attackState
  );
  if (attackCommands) {
    yield put(saveCommandSuccess(attackCommands));
  }
  try {
    let responseStatus = yield call(emitSendCommand, payload);
    console.log(responseStatus);
    if (responseStatus === "OK") {
      yield put(
        sendCommandSuccess({
          commandId: payload.commandId,
          commandLineId: `${commandLineId}c`,
        })
      );
    } else {
      yield put(
        sendCommandFailed({
          commandId: payload.commandId,
          commandLineId: `${commandLineId}c`,
        })
      );
    }
  } catch (error) {
    yield put(
      sendCommandFailed({
        commandId: payload.commandId,
        commandLineId: `${commandLineId}c`,
      })
    );
  }
}

function* watchOnSendCommand() {
  yield takeEvery(AttackProcessActionTypes.SEND_COMMAND_PENDING, onSendCommand);
}

// Send Command Faied
function updateCommandFailed(
  { commandId, commandLineId }: FailedCommandPayload,
  attackState: AttackProcessState
) {
  try {
    let attackProcessCommandsClone = clone(attackState.commands);
    attackProcessCommandsClone[commandId].commandHistory[
      commandLineId
    ].isSending = false;
    attackProcessCommandsClone[commandId].commandHistory[
      commandLineId
    ].isFailed = true;
    attackProcessCommandsClone[commandId].commandHistory[
      commandLineId
    ].isSuccess = false;
    attackProcessCommandsClone[commandId].commandHistory[
      commandLineId
    ].isSending = false;
    attackProcessCommandsClone[commandId].commandHistory[
      commandLineId
    ].isFailed = true;
    attackProcessCommandsClone[commandId].commandHistory[
      commandLineId
    ].isSuccess = false;
    return attackProcessCommandsClone;
  } catch (error) {
    return false;
  }
}

function* onUpdateFailedCommand({ payload }: SendCommandFailedAction): any {
  try {
    const attackState = yield select(getAttackProcessState);
    let resultSavePendingCommand = yield call(
      updateCommandFailed,
      payload,
      attackState
    );
    if (resultSavePendingCommand) {
      yield put(saveCommandSuccess(resultSavePendingCommand));
    }
  } catch (error) {}
}

function* watchOnFailedCommand() {
  yield takeEvery(
    AttackProcessActionTypes.SEND_COMMAND_FAILED,
    onUpdateFailedCommand
  );
}

// Send Command Success
function updateCommandSuccess(
  { commandId, commandLineId }: SuccessCommandPayload,
  attackState: AttackProcessState
) {
  try {
    let attackProcessCommandsClone = clone(attackState.commands);
    attackProcessCommandsClone[commandId].commandHistory[
      commandLineId
    ].isSending = false;
    attackProcessCommandsClone[commandId].commandHistory[
      commandLineId
    ].isFailed = false;
    attackProcessCommandsClone[commandId].commandHistory[
      commandLineId
    ].isSuccess = true;
    attackProcessCommandsClone[commandId].commandHistory[
      commandLineId
    ].isSending = false;
    attackProcessCommandsClone[commandId].commandHistory[
      commandLineId
    ].isFailed = false;
    attackProcessCommandsClone[commandId].commandHistory[
      commandLineId
    ].isSuccess = true;
    return attackProcessCommandsClone;
  } catch (error) {
    return false;
  }
}

function* onUpdateSuccessCommand({ payload }: SendCommandSuccessAction): any {
  try {
    const attackState = yield select(getAttackProcessState);
    let resultSavePendingCommand = yield call(
      updateCommandSuccess,
      payload,
      attackState
    );
    if (resultSavePendingCommand) {
      yield put(saveCommandSuccess(resultSavePendingCommand));
    }
  } catch (error) {}
}

function* watchOnSuccessCommand() {
  yield takeEvery(
    AttackProcessActionTypes.SEND_COMMAND_SUCCESS,
    onUpdateSuccessCommand
  );
}

// Received command result
function receiveCommandResult(
  { commandId, result }: ReceivedCommandPayload,
  attackState: AttackProcessState
) {
  try {
    let attackProcessCommandsClone = clone(attackState.commands);
    let responseId = uuidv1();
    attackProcessCommandsClone[commandId].responseDialog[`${responseId}r`] = {
      response: result,
      timeResponse: new Date(),
      type: "Response",
    };
    attackProcessCommandsClone[commandId].fullDialog[`${responseId}r`] = {
      response: result,
      timeResponse: new Date(),
      type: "Response",
    };
    return attackProcessCommandsClone;
  } catch (error) {
    return false;
  }
}

function* onReceiveCommand({ payload }: ReceivedResponseAction): any {
  try {
    const attackState = yield select(getAttackProcessState);
    let resultSavePendingCommand = yield call(
      receiveCommandResult,
      payload,
      attackState
    );
    if (resultSavePendingCommand) {
      yield put(saveCommandSuccess(resultSavePendingCommand));
    }
  } catch (error) {}
}

function* watchOnReceiveCommandResult() {
  yield takeEvery(AttackProcessActionTypes.RECEIVED_RESPONSE, onReceiveCommand);
}

// Stop Attack
function emitStopAttack() {
  if (socket !== undefined) {
    return new Promise((resolve) => {
      //@ts-ignore
      socket.emit(
        SocketEvents.STOP_ATTACK,
        (responseStatus: string) => {
          resolve(responseStatus);
        }
      );
    });
  }
}

// Stop attack
function* onStopProcess(): any {
  try {
    const responseStatus = yield call(emitStopAttack);
    if (responseStatus === "OK") {
      yield put(stopAttackSuccess());
    }
  } catch (error) {
  }
}

// Bắt update host pending event
function* watchOnStopAttack() {
  yield takeEvery(
    AttackProcessActionTypes.STOP_ATTACK,
    onStopProcess
  );
}

export default function* attackProcessesSaga() {
  yield all([fork(watchOnStartAttack)]);
  yield all([fork(watchOnAddData)]);
  yield all([fork(watchOnScanning)]);
  yield all([fork(watchOnScanSuccess)]);
  yield all([fork(watchOnScanFailed)]);
  yield all([fork(watchOnGotShell)]);
  yield all([fork(watchOnGotMeterpreter)]);
  yield all([fork(watchOnSendCommand)]);
  yield all([fork(watchOnSuccessCommand)]);
  yield all([fork(watchOnFailedCommand)]);
  yield all([fork(watchOnReceiveCommandResult)]);
  yield all([fork(watchOnStopAttack)]);
}
