import { combineReducers } from "redux";
import { hostsReducer, HostState } from "./HostReducer";
import { linksReducer } from "./LinkReducer";

const reducers = combineReducers({
  hosts: hostsReducer,
  links: linksReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
