import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
import {
  AddDetailPayload,
  ScanFailedPayload,
  ScanSuccessPayload,
  StartAttackPendingPayload,
  StartAttackSuccessPayload,
  TrainingSuccessPayload,
} from "../payload-types/AttackProcessPayloadTypes";

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
