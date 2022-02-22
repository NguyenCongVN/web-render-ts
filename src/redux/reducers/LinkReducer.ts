import { Link } from "../../utils/classes/Link";
import { LinkActionTypes } from "../action-types/Link.types";
import { LinkAction } from "../actions/Link.actions";

interface LinkState {
  links: Link[];
}

const initialState: LinkState = {
  links: [],
};

const linksReducer = (
  state: LinkState = initialState,
  action: LinkAction
): LinkState => {
  switch (action.type) {
    case LinkActionTypes.SET_LINKS:
      return { ...state, links: action.payload };
    default:
      return state;
  }
};

export { linksReducer };
