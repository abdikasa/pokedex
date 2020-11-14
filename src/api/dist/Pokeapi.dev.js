"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Pokeapi = _axios["default"].create({
  baseURL: "https://pokeapi.co/api/v2/"
});

var _default = Pokeapi;
exports["default"] = _default;