import { Link } from "../../utils/classes/Link";
import { LinkActionTypes } from "../action-types/Link.types";

export const setLinks = (links: Link[]) => {
  return {
    type: LinkActionTypes.SET_LINKS,
    payload: links,
  };
};
