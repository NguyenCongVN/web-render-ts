import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
import {
  AddDetailPayload,
  ScanFailedPayload,
  ScanSuccessPayload,
  StartAttackPendingPayload,
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
  payload : ScanSuccessPayload
}


export interface ScanningFailedAction {
  type: AttackProcessActionTypes.SCANING_FAILED;
  payload : ScanFailedPayload
}

// Add Detail
export interface AddDetailProcessAction {
  type: AttackProcessActionTypes.ADD_DETAIL_PROCESS;
  payload: AddDetailPayload;
}

export type AttackProcessAction =
  | StartAttackPendingAction
  | StartAttackSuccessAction
  | StartAttackFailedAction
  | ToogleAskScanAction
  | StartScanningAction
  | AddDetailProcessAction;
