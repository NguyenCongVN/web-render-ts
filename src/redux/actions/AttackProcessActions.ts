import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
import {
  AddDetailPayload,
  AttackStateChangePayload,
  GotMeterpreterPayload,
  GotShellPayload,
  ScanFailedPayload,
  ScanSuccessPayload,
  StartAttackPendingPayload,
  TrainingSuccessPayload,
} from "../payload-types/AttackProcessPayloadTypes";

export interface ToogleAskScanAction {
  type: AttackProcessActionTypes.TOOGLE_ASK_SCAN;
}
export interface StartAttackPendingAction {
  type: AttackProcessActionTypes.START_ATTACK_PENDING;
  payload: StartAttackPendingPayload;
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
  | OpenCommandAction;
