import { Host } from "../../utils/classes/Host";
import { HostActionTypes } from "../action-types/Host.types";
import { HostAction } from "../actions/Host.actions";

export interface HostState {
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
    case HostActionTypes.REMOVE_VULNERBILITY_PENDING:
      return {
        ...state,
        isUpdating: true,
        isUpdateFailed: false,
        isUpdateSuccess: false,
      };
    case HostActionTypes.REMOVE_VULNERBILITY_SUCCESS:
      return {
        ...state,
        isUpdateSuccess: true,
        isUpdating: false,
        isUpdateFailed: false,
      };
    case HostActionTypes.REMOVE_VULNERBILITY_FAILED:
      return {
        ...state,
        isUpdateSuccess: false,
        isUpdating: false,
        isUpdateFailed: true,
      };
    //   Service
    case HostActionTypes.ADD_SERVICE_PENDING:
      return {
        ...state,
        isUpdating: true,
        isUpdateFailed: false,
        isUpdateSuccess: false,
      };
    case HostActionTypes.ADD_SERVICE_SUCCESS:
      return {
        ...state,
        isUpdateSuccess: true,
        isUpdating: false,
        isUpdateFailed: false,
      };
    case HostActionTypes.ADD_SERVICE_FAILED:
      return {
        ...state,
        isUpdateSuccess: false,
        isUpdating: false,
        isUpdateFailed: true,
      };
    case HostActionTypes.REMOVE_SERVICE_PENDING:
      return {
        ...state,
        isUpdating: true,
        isUpdateFailed: false,
        isUpdateSuccess: false,
      };
    case HostActionTypes.REMOVE_SERVICE_SUCCESS:
      return {
        ...state,
        isUpdateSuccess: true,
        isUpdating: false,
        isUpdateFailed: false,
      };
    case HostActionTypes.REMOVE_SERVICE_FAILED:
      return {
        ...state,
        isUpdateSuccess: false,
        isUpdating: false,
        isUpdateFailed: true,
      };

    //   NFS Mounted
    case HostActionTypes.ADD_NFSMOUNTED_PENDING:
      return {
        ...state,
        isUpdating: true,
        isUpdateFailed: false,
        isUpdateSuccess: false,
      };
    case HostActionTypes.ADD_NFSMOUNTED_SUCCESS:
      return {
        ...state,
        isUpdateSuccess: true,
        isUpdating: false,
        isUpdateFailed: false,
      };
    case HostActionTypes.ADD_NFSMOUNTED_FAILED:
      return {
        ...state,
        isUpdateSuccess: false,
        isUpdating: false,
        isUpdateFailed: true,
      };
    case HostActionTypes.REMOVE_NFSMOUNTED_PENDING:
      return {
        ...state,
        isUpdating: true,
        isUpdateFailed: false,
        isUpdateSuccess: false,
      };
    case HostActionTypes.REMOVE_NFSMOUNTED_SUCCESS:
      return {
        ...state,
        isUpdateSuccess: true,
        isUpdating: false,
        isUpdateFailed: false,
      };
    case HostActionTypes.REMOVE_NFSMOUNTED_FAILED:
      return {
        ...state,
        isUpdateSuccess: false,
        isUpdating: false,
        isUpdateFailed: true,
      };
    //   NFS Exported
    case HostActionTypes.ADD_NFSEXPORTED_PENDING:
      return {
        ...state,
        isUpdating: true,
        isUpdateFailed: false,
        isUpdateSuccess: false,
      };
    case HostActionTypes.ADD_NFSEXPORTED_SUCCESS:
      return {
        ...state,
        isUpdateSuccess: true,
        isUpdating: false,
        isUpdateFailed: false,
      };
    case HostActionTypes.ADD_NFSEXPORTED_FAILED:
      return {
        ...state,
        isUpdateSuccess: false,
        isUpdating: false,
        isUpdateFailed: true,
      };
    case HostActionTypes.REMOVE_NFSEXPORTED_PENDING:
      return {
        ...state,
        isUpdating: true,
        isUpdateFailed: false,
        isUpdateSuccess: false,
      };
    case HostActionTypes.REMOVE_NFSEXPORTED_SUCCESS:
      return {
        ...state,
        isUpdateSuccess: true,
        isUpdating: false,
        isUpdateFailed: false,
      };
    case HostActionTypes.REMOVE_NFSEXPORTED_FAILED:
      return {
        ...state,
        isUpdateSuccess: false,
        isUpdating: false,
        isUpdateFailed: true,
      };
    case HostActionTypes.SAVE_DRAFTHOST:
      return {
        ...state,
        hosts: state.draftHosts,
        isUpdateSuccess: true,
        isUpdating: false,
        isUpdateFailed: false,
      };
    default:
      return state;
  }
};

export { hostsReducer };
