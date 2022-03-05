import { Host } from "../../utils/classes/Host";
import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
import { AttackProcessAction } from "../actions/AttackProcessActions";

interface IndividualAttackState {
  detail: string;
  time: Date;
}
export interface AttackProcessState {
  process: IndividualAttackState[];
  isStartingAttack: boolean;
  isStartAttackFailed: boolean;
  isAttacking: boolean;
  isScanning: boolean;
  isAttackSuccess: boolean;
  currentNode: string | undefined; // HostLabel
}

const initialState: AttackProcessState = {
  process: [],
  isAttackSuccess: false,
  isScanning: false,
  isAttacking: false,
  currentNode: undefined,
  isStartingAttack: false,
  isStartAttackFailed: false,
};

const attackProcessReducer = (
  state: AttackProcessState = initialState,
  action: AttackProcessAction
): AttackProcessState => {
  switch (action.type) {
    case AttackProcessActionTypes.START_ATTACK_PENDING:
      return { ...state, isStartingAttack: true };
    default:
      return state;
  }
};

export { attackProcessReducer };
