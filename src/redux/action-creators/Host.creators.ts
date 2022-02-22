import { Host } from "../../utils/classes/Host";
import { Service } from "../../utils/classes/Service";
import { Vulnerbility } from "../../utils/classes/Vulnerbility";
import { HostActionTypes } from "../action-types/Host.types";
import {
  AddVulnerbilityPendingAction,
  AddVulnerbilitySuccessAction,
} from "../actions/Host.actions";
import { AddVulnerbilityPayload } from "../payload-types/HostPayloadTypes";
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
