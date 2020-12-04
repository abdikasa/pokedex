"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(state, action) {
  switch (action.type) {
    case "FETCH_BIO":
      return action.payload;

    default:
      return state;
  }
};

exports["default"] = _default;