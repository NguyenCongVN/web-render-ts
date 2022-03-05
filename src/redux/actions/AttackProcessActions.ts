import { Host } from "../../utils/classes/Host";
import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";

export interface StartAttackPendingAction {
  type: AttackProcessActionTypes.START_ATTACK_PENDING;
  payload: Host[];
}

export type AttackProcessAction = StartAttackPendingAction;
