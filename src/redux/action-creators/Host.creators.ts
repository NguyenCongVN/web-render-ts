import { Host } from "../../utils/classes/Host";
import { HostActionTypes } from "../action-types/Host.types";
import {
  AddBlackDirectionPayload,
  AddNfsExportedPayload,
  AddNfsMountedPayload,
  AddServicePayload,
  AddVulnerbilityPayload,
  RemoveBlackDirectionPayload,
  RemoveNfsExportedPayload,
  RemoveNfsMountedPayload,
  RemoveServicePayload,
  RemoveVulnerbilityPayload,
} from "../payload-types/HostPayloadTypes";
export const setHosts = (hosts: Host[]) => {
  return {
    type: HostActionTypes.SET_HOSTS,
    payload: hosts,
  };
};

export const SetDraftHost = (hosts: Host[]) => {
  return {
    type: HostActionTypes.SET_DRAFT_HOSTS,
    payload: hosts,
  };
};

export const updateHostPending = (host: Host) => {
  return {
    type: HostActionTypes.UPDATE_HOST_PENDING,
    payload: host,
  };
};

export const updateHostSuccess = (hosts: Host[]) => {
  return {
    type: HostActionTypes.UPDATE_HOST_SUCCESS,
    payload: hosts,
  };
};

export const updateHostFailed = () => {
  return {
    type: HostActionTypes.UPDATE_HOST_FAILED,
  };
};

export const updateDraftHostPending = (host: Host) => {
  return {
    type: HostActionTypes.UPDATE_DRAFT_HOST_PENDING,
    payload: host,
  };
};

export const updateDraftHostSuccess = (hosts: Host[]) => {
  return {
    type: HostActionTypes.UPDATE_DRAFT_HOST_SUCCESS,
    payload: hosts,
  };
};

export const updateDraftHostFailed = () => {
  return {
    type: HostActionTypes.UPDATE_DRAFT_HOST_FAILED,
  };
};

export const ToogleOpenAlert = () => {
  return {
    type: HostActionTypes.TOOGLE_OPEN_ALERT,
  };
};

//  Vulnerbility

export const addVulnerbilityPending = (payload: AddVulnerbilityPayload) => {
  return {
    type: HostActionTypes.ADD_VULNERBILITY_PENDING,
    payload: payload,
  };
};
export const addVulnerbilitySuccess = (payload: Host[]) => {
  return {
    type: HostActionTypes.ADD_VULNERBILITY_SUCCESS,
    payload: payload,
  };
};

export const addVulnerbilityFailed = () => {
  return {
    type: HostActionTypes.ADD_VULNERBILITY_FAILED,
  };
};

export const removeVulnerbilityPending = (
  payload: RemoveVulnerbilityPayload
) => {
  return {
    type: HostActionTypes.REMOVE_VULNERBILITY_PENDING,
    payload: payload,
  };
};
export const removeVulnerbilitySuccess = (payload: Host[]) => {
  return {
    type: HostActionTypes.REMOVE_VULNERBILITY_SUCCESS,
    payload: payload,
  };
};

export const removeVulnerbilityFailed = () => {
  return {
    type: HostActionTypes.REMOVE_VULNERBILITY_FAILED,
  };
};

// NFS Mounted
export const addServicePending = (payload: AddServicePayload) => {
  return {
    type: HostActionTypes.ADD_SERVICE_PENDING,
    payload: payload,
  };
};
export const addServiceSuccess = (payload: Host[]) => {
  return {
    type: HostActionTypes.ADD_SERVICE_SUCCESS,
    payload: payload,
  };
};

export const addServiceFailed = () => {
  return {
    type: HostActionTypes.ADD_SERVICE_FAILED,
  };
};

export const removeServicePending = (payload: RemoveServicePayload) => {
  return {
    type: HostActionTypes.REMOVE_SERVICE_PENDING,
    payload: payload,
  };
};
export const removeServiceSuccess = (payload: Host[]) => {
  return {
    type: HostActionTypes.REMOVE_SERVICE_SUCCESS,
    payload: payload,
  };
};

export const removeServiceFailed = () => {
  return {
    type: HostActionTypes.REMOVE_SERVICE_FAILED,
  };
};

// NFS Mounted
export const addNfsMountedPending = (payload: AddNfsMountedPayload) => {
  return {
    type: HostActionTypes.ADD_NFSMOUNTED_PENDING,
    payload: payload,
  };
};
export const addNfsMountedSuccess = (payload: Host[]) => {
  return {
    type: HostActionTypes.ADD_NFSMOUNTED_SUCCESS,
    payload: payload,
  };
};

export const addNfsMountedFailed = () => {
  return {
    type: HostActionTypes.ADD_NFSMOUNTED_FAILED,
  };
};

export const removeNfsMountedPending = (payload: RemoveNfsMountedPayload) => {
  return {
    type: HostActionTypes.REMOVE_NFSMOUNTED_PENDING,
    payload: payload,
  };
};
export const removeNfsMountedSuccess = (payload: Host[]) => {
  return {
    type: HostActionTypes.REMOVE_NFSMOUNTED_SUCCESS,
    payload: payload,
  };
};

export const removeNfsMountedFailed = () => {
  return {
    type: HostActionTypes.REMOVE_NFSMOUNTED_FAILED,
  };
};

// NFS Exported
export const addNfsExportedPending = (payload: AddNfsExportedPayload) => {
  return {
    type: HostActionTypes.ADD_NFSEXPORTED_PENDING,
    payload: payload,
  };
};
export const addNfsExportedSuccess = (payload: Host[]) => {
  return {
    type: HostActionTypes.ADD_NFSEXPORTED_SUCCESS,
    payload: payload,
  };
};

export const addNfsExportedFailed = () => {
  return {
    type: HostActionTypes.ADD_NFSEXPORTED_FAILED,
  };
};

export const removeNfsExportedPending = (payload: RemoveNfsExportedPayload) => {
  return {
    type: HostActionTypes.REMOVE_NFSEXPORTED_PENDING,
    payload: payload,
  };
};
export const removeNfsExportedSuccess = (payload: Host[]) => {
  return {
    type: HostActionTypes.REMOVE_NFSEXPORTED_SUCCESS,
    payload: payload,
  };
};

export const removeNfsExportedFailed = () => {
  return {
    type: HostActionTypes.REMOVE_NFSEXPORTED_FAILED,
  };
};

// Add Black Direction

export const addBlackDirectionPending = (payload: AddBlackDirectionPayload) => {
  return {
    type: HostActionTypes.ADD_BLACK_DIRECTION_PENDING,
    payload: payload,
  };
};
export const addBlackDirectionSuccess = () => {
  return {
    type: HostActionTypes.ADD_BLACK_DIRECTION_SUCCESS,
  };
};

export const addBlackDirectionFailed = () => {
  return {
    type: HostActionTypes.ADD_BLACK_DIRECTION_FAILED,
  };
};

// Remove BlackDirection

export const removeBlackDirectionPending = (
  payload: RemoveBlackDirectionPayload
) => {
  return {
    type: HostActionTypes.REMOVE_BLACK_DIRECTION_PENDING,
    payload: payload,
  };
};
export const removeBlackDirectionSuccess = () => {
  return {
    type: HostActionTypes.REMOVE_BLACK_DIRECTION_SUCCESS,
  };
};

export const removeBlackDirectionFailed = () => {
  return {
    type: HostActionTypes.REMOVE_BLACK_DIRECTION_FAILED,
  };
};


// Add Attack Options

export const addAttackOptionsPending = (payload: AddBlackDirectionPayload) => {
  return {
    type: HostActionTypes.ADD_BLACK_DIRECTION_PENDING,
    payload: payload,
  };
};
export const addAttackOptionsSuccess = () => {
  return {
    type: HostActionTypes.ADD_BLACK_DIRECTION_SUCCESS,
  };
};

export const addAttackOptionsFailed = () => {
  return {
    type: HostActionTypes.ADD_BLACK_DIRECTION_FAILED,
  };
};

export const saveDraftHosts = () => {
  return {
    type: HostActionTypes.SAVE_DRAFTHOST,
  };
};
