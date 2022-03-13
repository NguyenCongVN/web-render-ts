import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
import { StartAttackPendingPayload } from "../payload-types/AttackProcessPayloadTypes";
export interface StartAttackPendingAction {
  type: AttackProcessActionTypes.START_ATTACK_PENDING;
  payload: StartAttackPendingPayload;
}

export interface StartAttackSuccessAction {
  type: AttackProcessActionTypes.START_ATTACK_SUCCESS;
  payload: {
    currentHostLabel: string;
    currentStateNum: number;
  };
}

export interface StartAttackFailedAction {
  type: AttackProcessActionTypes.START_ATTACK_FAILED;
}

// Scanning
export interface StartScanningPendingAction {
  type: AttackProcessActionTypes.START_SCANNING_PENDING;
  payload: {
    scanConfigFile: string;
    topologyFile: string;
    connectedMap: string;
  };
}

export interface StartScanningSuccessAction {
  type: AttackProcessActionTypes.START_SCANNING_SUCCESS;
}

export interface StartScanningFailedAction {
  type: AttackProcessActionTypes.START_SCANNING_FAILED;
}

export type AttackProcessAction =
  | StartAttackPendingAction
  | StartAttackSuccessAction
  | StartAttackFailedAction
  | StartScanningFailedAction
  | StartScanningPendingAction
  | StartScanningSuccessAction;
