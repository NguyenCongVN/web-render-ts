import { Host } from "../../utils/classes/Host";
import { HostActionTypes } from "../action-types/Host.types";
import { HostAction } from "../actions/Host.actions";

interface HostState {
  hosts: Host[];
  draftHosts: Host[];
  isUpdateSuccess: boolean;
  isUpdating: boolean;
  isUpdateFailed: boolean;
}

const initialState: HostState = {
  hosts: [],
  draftHosts: [],
  isUpdateSuccess: false,
  isUpdating: false,
  isUpdateFailed: false,
};

const hostsReducer = (
  state: HostState = initialState,
  action: HostAction
): HostState => {
  switch (action.type) {
    case HostActionTypes.SET_HOSTS:
      return { ...state, hosts: action.payload };
    case HostActionTypes.SET_DRAFT_HOSTS:
      return { ...state, draftHosts: action.payload };
    case HostActionTypes.UPDATE_HOST_PENDING:
      return {
        ...state,
        isUpdateSuccess: false,
        isUpdating: true,
        isUpdateFailed: false,
      };
    case HostActionTypes.UPDATE_HOST_SUCCESS:
      return {
        ...state,
        hosts: action.payload,
        isUpdateFailed: false,
        isUpdating: false,
        isUpdateSuccess: true,
      };
    case HostActionTypes.UPDATE_HOST_FAILED:
      return {
        ...state,
        isUpdateSuccess: false,
        isUpdating: false,
        isUpdateFailed: true,
      };
    case HostActionTypes.UPDATE_DRAFT_HOST_PENDING:
      return {
        ...state,
        isUpdateSuccess: false,
        isUpdating: true,
        isUpdateFailed: false,
      };
    case HostActionTypes.UPDATE_DRAFT_HOST_SUCCESS:
      return {
        ...state,
        draftHosts: action.payload,
        isUpdateSuccess: true,
        isUpdating: false,
        isUpdateFailed: false,
      };
    case HostActionTypes.UPDATE_DRAFT_HOST_FAILED:
      return {
        ...state,
        isUpdateSuccess: false,
        isUpdating: false,
        isUpdateFailed: true,
      };
    case HostActionTypes.TOOGLE_OPEN_ALERT:
      return {
        ...state,
        isUpdateSuccess: false,
        isUpdating: false,
        isUpdateFailed: false,
      };
    case HostActionTypes.ADD_VULNERBILITY_PENDING:
      return {
        ...state,
        isUpdating: true,
        isUpdateFailed: false,
        isUpdateSuccess: false,
      };
    case HostActionTypes.ADD_VULNERBILITY_SUCCESS:
      return {
        ...state,
        isUpdateSuccess: true,
        isUpdating: false,
        isUpdateFailed: false,
      };
    case HostActionTypes.ADD_VULNERBILITY_FAILED:
      return {
        ...state,
        isUpdateSuccess: false,
        isUpdating: false,
        isUpdateFailed: true,
      };
    default:
      return state;
  }
};

export { hostsReducer };
