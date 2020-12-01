import { combineReducers } from "redux";
import fetchAllReducer from "./fetchAllReducer";

export default combineReducers({
  getAll: fetchAllReducer,
});
