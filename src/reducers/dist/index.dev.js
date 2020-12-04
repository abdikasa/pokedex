"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _fetchAllReducer = _interopRequireDefault(require("./fetchAllReducer"));

var _selectedReducer = _interopRequireDefault(require("./selectedReducer"));

var _bioReducer = _interopRequireDefault(require("./bioReducer"));

var _evolutionReducer = _interopRequireDefault(require("./evolutionReducer"));

var _setChartReducer = _interopRequireDefault(require("./setChartReducer"));

var _getAbilityReducer = _interopRequireDefault(require("./getAbilityReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _redux.combineReducers)({
  getAll: _fetchAllReducer["default"],
  selected: _selectedReducer["default"],
  bio: _bioReducer["default"],
  evolution: _evolutionReducer["default"],
  chart: _setChartReducer["default"],
  abilities: _getAbilityReducer["default"]
});

exports["default"] = _default;