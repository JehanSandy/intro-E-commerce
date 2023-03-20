import { combineReducers } from "redux";
import userReducer from "./userReducer";
import historiReducer from "./historyReduser";

export default combineReducers({
  userReducer,
  historiReducer,
});
