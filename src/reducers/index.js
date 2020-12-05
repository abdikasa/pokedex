import { combineReducers } from "redux";
import fetchAllReducer from "./fetchAllReducer";
import selectedReducer from "./selectedReducer";
import bioReducer from "./bioReducer";
import evolutionReducer from "./evolutionReducer";
import setChartReducer from "./setChartReducer";
import getAbilityReducer from "./getAbilityReducer";
import filteredReducer from "./filteredReducer";

export default combineReducers({
  getAll: fetchAllReducer,
  selected: selectedReducer,
  bio: bioReducer,
  evolution: evolutionReducer,
  chart: setChartReducer,
  abilities: getAbilityReducer,
  searched: filteredReducer,
});
