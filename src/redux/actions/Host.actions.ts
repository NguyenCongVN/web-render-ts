import { Host } from "../../utils/classes/Host";
import { HostActionTypes } from "../action-types/Host.types";
import {
  AddNfsExportedPayload,
  AddNfsMountedPayload,
  AddServicePayload,
  AddVulnerbilityPayload,
  RemoveNfsExportedPayload,
  RemoveNfsMountedPayload,
  RemoveServicePayload,
  RemoveVulnerbilityPayload,
} from "../payload-types/HostPayloadTypes";
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

export interface RemoveVulnerbilityPendingAction {
  type: HostActionTypes.REMOVE_VULNERBILITY_PENDING;
  payload: RemoveVulnerbilityPayload;
}

export interface RemoveVulnerbilitySuccessAction {
  type: HostActionTypes.REMOVE_VULNERBILITY_SUCCESS;
  payload: Host[];
}

export interface RemoveVulnerbilityFailedAction {
  type: HostActionTypes.REMOVE_VULNERBILITY_FAILED;
}

//  Service
export interface AddServicePendingAction {
  type: HostActionTypes.ADD_SERVICE_PENDING;
  payload: AddServicePayload;
}

export interface AddServiceSuccessAction {
  type: HostActionTypes.ADD_SERVICE_SUCCESS;
  payload: Host[];
}

export interface AddServiceFailedAction {
  type: HostActionTypes.ADD_SERVICE_FAILED;
}

export interface RemoveServicePendingAction {
  type: HostActionTypes.REMOVE_SERVICE_PENDING;
  payload: RemoveServicePayload;
}

export interface RemoveServiceSuccessAction {
  type: HostActionTypes.REMOVE_SERVICE_SUCCESS;
  payload: Host[];
}

export interface RemoveServiceFailedAction {
  type: HostActionTypes.REMOVE_SERVICE_FAILED;
}

//  NFS Mounted
export interface AddNfsMountedPendingAction {
  type: HostActionTypes.ADD_NFSMOUNTED_PENDING;
  payload: AddNfsMountedPayload;
}

export interface AddNfsMountedSuccessAction {
  type: HostActionTypes.ADD_NFSMOUNTED_SUCCESS;
  payload: Host[];
}

export interface AddNfsMountedFailedAction {
  type: HostActionTypes.ADD_NFSMOUNTED_FAILED;
}

export interface RemoveNfsMountedPendingAction {
  type: HostActionTypes.REMOVE_NFSMOUNTED_PENDING;
  payload: RemoveNfsMountedPayload;
}

export interface RemoveNfsMountedSuccessAction {
  type: HostActionTypes.REMOVE_NFSMOUNTED_SUCCESS;
  payload: Host[];
}

export interface RemoveNfsMountedFailedAction {
  type: HostActionTypes.REMOVE_NFSMOUNTED_FAILED;
}

//  NFS Exported
export interface AddNfsExportedPendingAction {
  type: HostActionTypes.ADD_NFSEXPORTED_PENDING;
  payload: AddNfsExportedPayload;
}

export interface AddNfsExportedSuccessAction {
  type: HostActionTypes.ADD_NFSEXPORTED_SUCCESS;
  payload: Host[];
}

export interface AddNfsExportedFailedAction {
  type: HostActionTypes.ADD_NFSEXPORTED_FAILED;
}

export interface RemoveNfsExportedPendingAction {
  type: HostActionTypes.REMOVE_NFSEXPORTED_PENDING;
  payload: RemoveNfsExportedPayload;
}

export interface RemoveNfsExportedSuccessAction {
  type: HostActionTypes.REMOVE_NFSEXPORTED_SUCCESS;
  payload: Host[];
}

export interface RemoveNfsExportedFailedAction {
  type: HostActionTypes.REMOVE_NFSEXPORTED_FAILED;
}

export interface SaveDraftHosts {
  type: HostActionTypes.SAVE_DRAFTHOST;
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
  | AddVulnerbilityFailedAction
  | RemoveVulnerbilityPendingAction
  | RemoveVulnerbilitySuccessAction
  | RemoveVulnerbilityFailedAction
  | AddServicePendingAction
  | AddServiceSuccessAction
  | AddServiceFailedAction
  | RemoveServicePendingAction
  | RemoveServiceSuccessAction
  | RemoveServiceFailedAction
  | RemoveNfsMountedPendingAction
  | RemoveNfsMountedSuccessAction
  | RemoveNfsMountedFailedAction
  | AddNfsMountedPendingAction
  | AddNfsMountedSuccessAction
  | AddNfsMountedFailedAction
  | AddNfsExportedFailedAction
  | AddNfsExportedSuccessAction
  | AddNfsExportedPendingAction
  | RemoveNfsExportedPendingAction
  | RemoveNfsExportedFailedAction
  | RemoveNfsExportedSuccessAction
  | SaveDraftHosts;
