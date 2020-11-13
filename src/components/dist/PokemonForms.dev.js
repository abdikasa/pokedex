"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _usefulFunctions = require("../usefulFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PokemonForms = function PokemonForms(pokemon) {
  var forms = (0, _usefulFunctions.checkForms)();
  console.log(pokemon); // return (
  //     <React.Fragment key={Math.random() * 10000}>
  //       <div className="ui segment center aligned flex-column">
  //         <h1 className="ui label huge">Evolution Line</h1>
  //         <div style={{ marginTop: "3rem" }}>{showEvolution}</div>
  //       </div>
  //     </React.Fragment>
  //   );
};

var _default = PokemonForms;
exports["default"] = _default;