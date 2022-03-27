import { CommandType } from "../../utils/enums/CommandType";
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

export interface ResponseDialog {
  response: string;
  timeResponse: Date;
  type: "Response";
}

export interface CommandLine {
  commandRequest: string;
  isSending: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  timeRequest: Date;
  type: "Command";
}

export interface Command {
  type: CommandType;
  commandHistory: { [id: string]: CommandLine };
  responseDialog: { [id: string]: ResponseDialog };
  fullDialog: { [id: string]: CommandLine | ResponseDialog };
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
  isAttackFinalTargetSuccess: boolean | undefined;
  isStartingScanning: boolean;
  isScanningFailed: boolean;
  isTraining: boolean;
  isTrainingFailed: boolean;
  currentHostLabel: string | undefined; // HostLabel
  currentStateAttack: number | undefined; // State Number
  askScanOpen: boolean;
  detail: string;
  attackPath: string | undefined;
  openComand: boolean;
  commands: { [id: string]: Command };
  selectedCommand: string | undefined;
}

const initialState: AttackProcessState = {
  processes: [],
  isAttackFinalTargetSuccess: undefined,
  isScanning: false,
  isAttacking: false,
  currentHostLabel: undefined,
  isStartingAttack: false,
  isStartAttackFailed: false,
  isStartingScanning: false,
  isScanningFailed: false,
  isTraining: false,
  isTrainingFailed: false,
  currentStateAttack: undefined,
  askScanOpen: false,
  detail: "",
  attackPath: undefined,
  openComand: false,
  commands: {},
  selectedCommand: undefined,
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
        isScanning: false,
        isScanningFailed: false,
        isTraining: false,
        isTrainingFailed: false,
        processes: [],
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
    case AttackProcessActionTypes.SCANING_FAILED:
      return {
        ...state,
        isScanningFailed: true,
      };

    case AttackProcessActionTypes.SCANING_SUCCESS_ALL:
      return {
        ...state,
        isScanning: false,
      };
    case AttackProcessActionTypes.TRANING:
      return {
        ...state,
        isTraining: true,
      };
    case AttackProcessActionTypes.TRANING_SUCCESS:
      return {
        ...state,
        isTraining: false,
        isTrainingFailed: false,
        attackPath: action.payload.path,
      };
    case AttackProcessActionTypes.TRANING_FAILED:
      return {
        ...state,
        isTraining: false,
        isTrainingFailed: true,
      };

    case AttackProcessActionTypes.ATTACKING:
      return {
        ...state,
        isAttacking: true,
      };

    case AttackProcessActionTypes.ATTACK_STATE_CHANGE:
      return {
        ...state,
        currentHostLabel:
          action.payload.currentHostLabel !== ""
            ? action.payload.currentHostLabel
            : state.currentHostLabel,
        currentStateAttack: action.payload.currentState,
      };
    case AttackProcessActionTypes.ATTACK_FAILED:
      return {
        ...state,
        isAttacking: false,
        isAttackFinalTargetSuccess: false,
      };
    case AttackProcessActionTypes.ATTACK_SUCCESS:
      return {
        ...state,
        isAttacking: false,
        isAttackFinalTargetSuccess: true,
      };
    case AttackProcessActionTypes.OPEN_COMMAND:
      return {
        ...state,
        openComand: true,
      };
    case AttackProcessActionTypes.CLOSE_COMMAND:
      return {
        ...state,
        openComand: false,
      };
    case AttackProcessActionTypes.SET_CURRENT_COMMAND:
      return {
        ...state,
        selectedCommand: action.payload,
      };
    case AttackProcessActionTypes.SAVE_COMMAND_SUCCESS:
      return {
        ...state,
        commands: action.payload,
      };
    default:
      return state;
  }
};

export { attackProcessReducer };
