import { Host } from "../../utils/classes/Host";
import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
import {
  AddDetailPayload,
  AttackStateChangePayload,
  GotMeterpreterPayload,
  GotShellPayload,
  ReceivedCommandPayload,
  ScanFailedPayload,
  ScanSuccessPayload,
  SendCommandPayload,
  StartAttackPendingPayload,
  TrainingSuccessPayload,
  FailedCommandPayload,
  SuccessCommandPayload,
  ReceivedAddAttackOptionsPayload,
  UpdateAttackOptionsPayload,
  UpdateAttackOptionsInitPayload,
} from "../payload-types/AttackProcessPayloadTypes";
import { Command, CommandLine } from "../reducers/AttackProcessReducer";

export interface ToogleAskScanAction {
  type: AttackProcessActionTypes.TOOGLE_ASK_SCAN;
}
export interface StartAttackPendingAction {
  type: AttackProcessActionTypes.START_ATTACK_PENDING;
  payload: StartAttackPendingPayload;
}

export interface StopAttackAction {
  type: AttackProcessActionTypes.STOP_ATTACK;
}

export interface StopAttackSucessAction {
  type: AttackProcessActionTypes.STOP_ATTACK_SUCCESS;
}

export interface StartAttackSuccessAction {
  type: AttackProcessActionTypes.START_ATTACK_SUCCESS;
}

export interface StartAttackFailedAction {
  type: AttackProcessActionTypes.START_ATTACK_FAILED;
}

// Scanning
export interface StartScanningAction {
  type: AttackProcessActionTypes.START_SCANING;
}

export interface ScanningSuccessAction {
  type: AttackProcessActionTypes.SCANING_SUCCESS;
  payload: ScanSuccessPayload;
}

export interface ScanningFailedAction {
  type: AttackProcessActionTypes.SCANING_FAILED;
  payload: ScanFailedPayload;
}

// Add Detail
export interface AddDetailProcessAction {
  type: AttackProcessActionTypes.ADD_DETAIL_PROCESS;
  payload: AddDetailPayload;
}

export interface ScanSuccessAllAction {
  type: AttackProcessActionTypes.SCANING_SUCCESS_ALL;
}

export interface StartTrainingAction {
  type: AttackProcessActionTypes.TRANING;
}

export interface TrainSucessAction {
  type: AttackProcessActionTypes.TRANING_SUCCESS;
  payload: TrainingSuccessPayload;
}

export interface TrainFailedAction {
  type: AttackProcessActionTypes.TRANING_FAILED;
}

export interface AttackingAction {
  type: AttackProcessActionTypes.ATTACKING;
}

export interface AttackStateChangeAction {
  type: AttackProcessActionTypes.ATTACK_STATE_CHANGE;
  payload: AttackStateChangePayload;
}

export interface AttackFailedAction {
  type: AttackProcessActionTypes.ATTACK_FAILED;
}

export interface AttackSuccessAction {
  type: AttackProcessActionTypes.ATTACK_SUCCESS;
}

export interface GotShellAction {
  type: AttackProcessActionTypes.GOT_SHELL;
  payload: GotShellPayload;
}

export interface GotMeterpreterAction {
  type: AttackProcessActionTypes.GOT_METERPRETER;
  payload: GotMeterpreterPayload;
}

export interface OpenCommandAction {
  type: AttackProcessActionTypes.OPEN_COMMAND;
}

export interface CloseCommandAction {
  type: AttackProcessActionTypes.CLOSE_COMMAND;
}

export interface SetSelectedCommandAction {
  type: AttackProcessActionTypes.SET_CURRENT_COMMAND;
  payload: string;
}

export interface SendCommandPendingAction {
  type: AttackProcessActionTypes.SEND_COMMAND_PENDING;
  payload: SendCommandPayload;
}

export interface SaveCommandSuccessAction {
  type: AttackProcessActionTypes.SAVE_COMMAND_SUCCESS;
  payload: { [id: string]: Command };
}

export interface SendCommandSuccessAction {
  type: AttackProcessActionTypes.SEND_COMMAND_SUCCESS;
  payload: SuccessCommandPayload;
}

export interface SendCommandFailedAction {
  type: AttackProcessActionTypes.SEND_COMMAND_FAILED;
  payload: FailedCommandPayload;
}

export interface ReceivedResponseAction {
  type: AttackProcessActionTypes.RECEIVED_RESPONSE;
  payload: ReceivedCommandPayload;
}

export interface ToogleShowAttackPathAction {
  type: AttackProcessActionTypes.TOOGLE_SHOW_ATTACKPATH;
}

// Just toogle to add attack options
export interface ToogleAddAttackOptionsAction {
  type: AttackProcessActionTypes.TOOGLE_ADD_ATTACK_OPTIONS;
  payload: { isInital: boolean };
}

// Add attack options when received from server.
export interface AddAttackOptionsAction {
  type: AttackProcessActionTypes.ADD_ATTACK_OPTIONS_PENDING;
  payload: ReceivedAddAttackOptionsPayload;
}

// update attack options
export interface UpdateAttackOptionsPendingAction {
  type: AttackProcessActionTypes.UPDATE_ATTACK_OPTIONS_PENDING;
  payload: UpdateAttackOptionsInitPayload;
}

// After update success.
export interface UpdateAttackOptionsSuccessAction {
  type: AttackProcessActionTypes.UPDATE_ATTACK_OPTIONS_SUCCESS;
  payload: UpdateAttackOptionsPayload;
}

// After update failed.
export interface UpdateAttackOptionsFailedAction {
  type: AttackProcessActionTypes.UPDATE_ATTACK_OPTIONS_FAILED;
}

export interface SetSelectedHostAttackOptionsAction {
  type: AttackProcessActionTypes.SET_SELECTED_HOST_OPEN_OPTIONS;
  payload: Host | undefined;
}

export type AttackProcessAction =
  | StartAttackPendingAction
  | StartAttackSuccessAction
  | StartAttackFailedAction
  | ToogleAskScanAction
  | StartScanningAction
  | AddDetailProcessAction
  | ScanningFailedAction
  | ScanSuccessAllAction
  | StartTrainingAction
  | TrainSucessAction
  | TrainFailedAction
  | AttackSuccessAction
  | AttackFailedAction
  | AttackStateChangeAction
  | AttackingAction
  | GotShellAction
  | GotMeterpreterAction
  | CloseCommandAction
  | OpenCommandAction
  | SetSelectedCommandAction
  | SendCommandSuccessAction
  | SendCommandPendingAction
  | SendCommandFailedAction
  | ReceivedResponseAction
  | SaveCommandSuccessAction
  | ToogleShowAttackPathAction
  | StopAttackAction
  | StopAttackSucessAction
  | ToogleAddAttackOptionsAction
  | AddAttackOptionsAction
  | UpdateAttackOptionsPendingAction
  | UpdateAttackOptionsFailedAction
  | UpdateAttackOptionsSuccessAction
  | SetSelectedHostAttackOptionsAction;
