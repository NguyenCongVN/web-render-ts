import { Host } from "../../utils/classes/Host";
import { HostActionTypes } from "../action-types/Host.types";
import { AddVulnerbilityPayload } from "../payload-types/HostPayloadTypes";
export interface SetHostsAction {
  type: HostActionTypes.SET_HOSTS;
  payload: Host[];
}

export interface SetDraftHostAction {
  type: HostActionTypes.SET_DRAFT_HOSTS;
  payload: Host[];
}

export interface UpdateHostPendingAction {
  type: HostActionTypes.UPDATE_DRAFT_HOST_PENDING;
  payload: Host;
}

export interface UpdateHostSuccessAction {
  type: HostActionTypes.UPDATE_HOST_SUCCESS;
  payload: Host[];
}

export interface UpdateHostFailedAction {
  type: HostActionTypes.UPDATE_DRAFT_HOST_FAILED;
}

export interface UpdateDraftHostPendingAction {
  type: HostActionTypes.UPDATE_HOST_PENDING;
  payload: Host;
}

export interface UpdateDraftHostSuccessAction {
  type: HostActionTypes.UPDATE_DRAFT_HOST_SUCCESS;
  payload: Host[];
}

export interface UpdateDraftHostFailedAction {
  type: HostActionTypes.UPDATE_HOST_FAILED;
}

export interface ToogleOpenAlert {
  type: HostActionTypes.TOOGLE_OPEN_ALERT;
}

export interface AddVulnerbilityPendingAction {
  type: HostActionTypes.ADD_VULNERBILITY_PENDING;
  payload: AddVulnerbilityPayload;
}

export interface AddVulnerbilitySuccessAction {
  type: HostActionTypes.ADD_VULNERBILITY_SUCCESS;
  payload: Host[];
}

export interface AddVulnerbilityFailedAction {
  type: HostActionTypes.ADD_VULNERBILITY_FAILED;
}

export type HostAction =
  | SetHostsAction
  | SetDraftHostAction
  | UpdateHostPendingAction
  | UpdateHostSuccessAction
  | UpdateHostFailedAction
  | UpdateDraftHostPendingAction
  | UpdateDraftHostSuccessAction
  | UpdateDraftHostFailedAction
  | ToogleOpenAlert
  | AddVulnerbilityPendingAction
  | AddVulnerbilitySuccessAction
  | AddVulnerbilityFailedAction;
