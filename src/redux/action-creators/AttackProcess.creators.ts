import { Host } from "../../utils/classes/Host";
import { Service } from "../../utils/classes/Service";
import { Vulnerbility } from "../../utils/classes/Vulnerbility";
import { AttackProcessActionTypes } from "../action-types/AttackProcess.types";
export const startAttackPending = (hosts: Host[]) => {
  return {
    type: AttackProcessActionTypes.START_ATTACK_PENDING,
    payload: hosts,
  };
};
