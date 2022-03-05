import { combineReducers } from "redux";
import { hostsReducer } from "./HostReducer";
import { linksReducer } from "./LinkReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["hosts", "links"],
};

const reducers = combineReducers({
  hosts: hostsReducer,
  links: linksReducer,
});

export default persistReducer(persistConfig, reducers);

export type RootState = ReturnType<typeof reducers>;
