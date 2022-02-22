import { Link } from "../../utils/classes/Link";
import { LinkActionTypes } from "../action-types/Link.types";

export interface SetLinksAction {
  type: LinkActionTypes.SET_LINKS;
  payload: Link[];
}
export type LinkAction = SetLinksAction;
