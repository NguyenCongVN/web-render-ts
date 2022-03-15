import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
import { AttackProcessAction } from "../actions/AttackProcessActions";

export enum IndividualAttackStatus {
  notStarted = "notStarted",
  scanning = "scanning",
  scanfinish = "scanfinish",
  attacking = "attacking",
  gotShell = "gotShell",
  gotMeterpreter = "gotMeterpreter",
}

export interface ProgressAttack {
  detail: string;
  time: Date;
  status: IndividualAttackStatus;
}

export interface IndividualAttackState {
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
  askScanOpen: boolean;
  detail: string;
  attackPath: string | undefined;
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
  askScanOpen: false,
  detail: "",
  attackPath: undefined,
};

const attackProcessReducer = (
  state: AttackProcessState = initialState,
  action: AttackProcessAction
): AttackProcessState => {
  switch (action.type) {
    case AttackProcessActionTypes.TOOGLE_ASK_SCAN:
      return {
        ...state,
        askScanOpen: !state.askScanOpen,
      };
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
      };

    // Scanning
    case AttackProcessActionTypes.START_SCANING:
      return {
        ...state,
        isStartingScanning: false,
        isScanning: true,
      };

    case AttackProcessActionTypes.ADD_DETAIL_PROCESS:
      return {
        ...state,
        detail: state.detail.concat(
          `${new Date().toLocaleDateString("en", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            weekday: "short",
          })}: ${action.payload.Detail}\n`
        ),
      };

    // Scanning Progress
    default:
      return state;
  }
};

export { attackProcessReducer };
