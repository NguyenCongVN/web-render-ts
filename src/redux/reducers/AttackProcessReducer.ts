import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
import { AttackProcessAction } from "../actions/AttackProcessActions";

export enum IndividualAttackStatus {
  notStarted = "notStarted",
  scanning = "scanning",
  attacking = "attacking",
  gotShell = "gotShell",
  gotMeterpreter = "gotMeterpreter",
}

interface ProgressAttack {
  detail: string;
  time: Date;
  status: IndividualAttackStatus;
}

interface IndividualAttackState {
  hostLable: string;
  progress: ProgressAttack[];
  scanReportId: string | undefined;
  shellNumberGot: string[];
  meterpreterGot: string[];
}
export interface AttackProcessState {
  processes: IndividualAttackState[];
  isStartingAttack: boolean;
  isStartAttackFailed: boolean;
  isAttacking: boolean;
  isScanning: boolean;
  isAttackFinalTargetSuccess: boolean;
  isStartingScanning: boolean;
  isStartingScanningFailed: boolean;
  currentHostLabel: string | undefined; // HostLabel
  currentStateAttack: number | undefined; // State Number
}

const initialState: AttackProcessState = {
  processes: [],
  isAttackFinalTargetSuccess: false,
  isScanning: false,
  isAttacking: false,
  currentHostLabel: undefined,
  isStartingAttack: false,
  isStartAttackFailed: false,
  isStartingScanning: false,
  isStartingScanningFailed: false,
  currentStateAttack: undefined,
};

const attackProcessReducer = (
  state: AttackProcessState = initialState,
  action: AttackProcessAction
): AttackProcessState => {
  switch (action.type) {
    case AttackProcessActionTypes.START_ATTACK_PENDING:
      return {
        ...state,
        isStartingAttack: true,
        isStartAttackFailed: false,
        isAttacking: false,
        isAttackFinalTargetSuccess: false,
        currentHostLabel: undefined,
        currentStateAttack: undefined,
      };
    case AttackProcessActionTypes.START_ATTACK_FAILED:
      return {
        ...state,
        isStartAttackFailed: true,
        isStartingAttack: false,
        isAttacking: false,
        currentHostLabel: undefined,
        currentStateAttack: undefined,
      };
    case AttackProcessActionTypes.START_ATTACK_SUCCESS:
      return {
        ...state,
        isStartAttackFailed: false,
        isStartingAttack: false,
        isAttacking: false,
        currentHostLabel: undefined,
        currentStateAttack: undefined,
      };

    // Scanning
    case AttackProcessActionTypes.START_SCANNING_PENDING:
      return {
        ...state,
        isStartAttackFailed: false,
        isStartingAttack: false,
        isAttacking: false,
        isStartingScanning: true,
        isScanning: false,
        isStartingScanningFailed: false,
        isAttackFinalTargetSuccess: false,
      };
    case AttackProcessActionTypes.START_SCANNING_SUCCESS:
      return {
        ...state,
        isStartingScanning: false,
        isScanning: true,
      };
    case AttackProcessActionTypes.START_SCANNING_FAILED:
      return {
        ...state,
        isStartingScanning: false,
        isStartingScanningFailed: true,
      };

    // Scanning Progress
    default:
      return state;
  }
};

export { attackProcessReducer };
