import { Host } from "../../utils/classes/Host";
import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
import {
  AddAttackOptionsAction,
  ReceivedResponseAction,
  UpdateAttackOptionsPendingAction,
} from "../actions/AttackProcessActions";
import {
  AddDetailPayload,
  ScanFailedPayload,
  ScanSuccessPayload,
  StartAttackPendingPayload,
  StartAttackSuccessPayload,
  TrainingSuccessPayload,
  AttackStateChangePayload,
  GotShellPayload,
  GotMeterpreterPayload,
  SendCommandPayload,
  FailedCommandPayload,
  SuccessCommandPayload,
  ReceivedCommandPayload,
  AttackFaiedPayload,
  ReceivedAddAttackOptionsPayload,
  UpdateAttackOptionsPayload,
  UpdateAttackOptionsInitPayload,
} from "../payload-types/AttackProcessPayloadTypes";
import { Command } from "../reducers/AttackProcessReducer";

export const toogleAskScan = () => {
  return {
    type: AttackProcessActionTypes.TOOGLE_ASK_SCAN,
  };
};

export const startAttackPending = (payload: StartAttackPendingPayload) => {
  return {
    type: AttackProcessActionTypes.START_ATTACK_PENDING,
    payload: payload,
  };
};

export const startAttackSuccess = () => {
  return {
    type: AttackProcessActionTypes.START_ATTACK_SUCCESS,
  };
};

export const startAttackFailed = () => {
  return {
    type: AttackProcessActionTypes.START_ATTACK_FAILED,
  };
};

export const startScaning = () => {
  return {
    type: AttackProcessActionTypes.START_SCANING,
  };
};

export const scanSuccess = (payload: ScanSuccessPayload) => {
  return {
    type: AttackProcessActionTypes.SCANING_SUCCESS,
    payload: payload,
  };
};

export const scanSuccessAll = () => {
  return {
    type: AttackProcessActionTypes.SCANING_SUCCESS_ALL,
  };
};

export const scanFailed = (payload: ScanFailedPayload) => {
  return {
    type: AttackProcessActionTypes.SCANING_FAILED,
    payload: payload,
  };
};

export const addDetailProcess = (payload: AddDetailPayload) => {
  return {
    type: AttackProcessActionTypes.ADD_DETAIL_PROCESS,
    payload: payload,
  };
};

export const startTraining = () => {
  return {
    type: AttackProcessActionTypes.TRANING,
  };
};

export const trainSuccess = (payload: TrainingSuccessPayload) => {
  return {
    type: AttackProcessActionTypes.TRANING_SUCCESS,
    payload: payload,
  };
};

export const trainFailed = () => {
  return {
    type: AttackProcessActionTypes.TRANING_FAILED,
  };
};

export const attacking = () => {
  return {
    type: AttackProcessActionTypes.ATTACKING,
  };
};

export const attackSuccess = () => {
  return {
    type: AttackProcessActionTypes.ATTACK_SUCCESS,
  };
};

export const attackFailed = () => {
  return {
    type: AttackProcessActionTypes.ATTACK_FAILED,
  };
};

export const attackStateChanged = (payload: AttackStateChangePayload) => {
  return {
    type: AttackProcessActionTypes.ATTACK_STATE_CHANGE,
    payload: payload,
  };
};

export const gotShell = (payload: GotShellPayload) => {
  return {
    type: AttackProcessActionTypes.GOT_SHELL,
    payload: payload,
  };
};

export const gotMeterpreter = (payload: GotMeterpreterPayload) => {
  return {
    type: AttackProcessActionTypes.GOT_METERPRETER,
    payload: payload,
  };
};

export const openCommand = () => {
  return {
    type: AttackProcessActionTypes.OPEN_COMMAND,
  };
};

export const closeCommand = () => {
  return {
    type: AttackProcessActionTypes.CLOSE_COMMAND,
  };
};

export const setSelectedCommand = (payload: string) => {
  return {
    type: AttackProcessActionTypes.SET_CURRENT_COMMAND,
    payload: payload,
  };
};

export const sendCommand = (payload: SendCommandPayload) => {
  return {
    type: AttackProcessActionTypes.SEND_COMMAND_PENDING,
    payload: payload,
  };
};

export const saveCommandSuccess = (payload: { [id: string]: Command[] }) => {
  return {
    type: AttackProcessActionTypes.SAVE_COMMAND_SUCCESS,
    payload: payload,
  };
};

export const sendCommandSuccess = (payload: SuccessCommandPayload) => {
  return {
    type: AttackProcessActionTypes.SEND_COMMAND_SUCCESS,
    payload: payload,
  };
};

export const sendCommandFailed = (payload: FailedCommandPayload) => {
  return {
    type: AttackProcessActionTypes.SEND_COMMAND_FAILED,
    payload: payload,
  };
};

export const receivedResponse = (payload: ReceivedCommandPayload) => {
  return {
    type: AttackProcessActionTypes.RECEIVED_RESPONSE,
    payload: payload,
  };
};

export const toogleShowAttackPath = () => {
  return {
    type: AttackProcessActionTypes.TOOGLE_SHOW_ATTACKPATH,
  };
};

export const stopAttack = () => {
  return {
    type: AttackProcessActionTypes.STOP_ATTACK,
  };
};

export const stopAttackSuccess = () => {
  return {
    type: AttackProcessActionTypes.STOP_ATTACK_SUCCESS,
  };
};

export const addAttackOptionsPending = (
  payload: ReceivedAddAttackOptionsPayload
) => {
  return {
    type: AttackProcessActionTypes.ADD_ATTACK_OPTIONS_PENDING,
    payload: payload,
  };
};

export const toogleAddAttackOptions = (payload: { isInital: boolean }) => {
  return {
    type: AttackProcessActionTypes.TOOGLE_ADD_ATTACK_OPTIONS,
    payload: payload,
  };
};

export const updateAttackOptionsPending = (
  payload: UpdateAttackOptionsInitPayload
) => {
  return {
    type: AttackProcessActionTypes.UPDATE_ATTACK_OPTIONS_PENDING,
    payload: payload,
  };
};

export const updateAttackOptionsSuccess = (payload: {
  addAttackPayload: ReceivedAddAttackOptionsPayload;
  isInitial: boolean; // want update and continue in server.
}) => {
  return {
    type: AttackProcessActionTypes.UPDATE_ATTACK_OPTIONS_SUCCESS,
    payload: payload,
  };
};

export const updateAttackOptionsFailed = () => {
  return {
    type: AttackProcessActionTypes.UPDATE_ATTACK_OPTIONS_FAILED,
  };
};

export const setSelectedHostAttackOptions = (
  selectedHost: Host | undefined
) => {
  return {
    type: AttackProcessActionTypes.SET_SELECTED_HOST_OPEN_OPTIONS,
    payload: selectedHost,
  };
};
