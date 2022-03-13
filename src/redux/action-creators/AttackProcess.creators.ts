import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
import { StartAttackPendingPayload } from "../payload-types/AttackProcessPayloadTypes";
export const startAttackPending = (payload: StartAttackPendingPayload) => {
  return {
    type: AttackProcessActionTypes.START_ATTACK_PENDING,
    payload: payload,
  };
};

export const startAttackFailed = () => {
  return {
    type: AttackProcessActionTypes.START_ATTACK_FAILED,
  };
};
