"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeDupes = mergeDupes;
exports.isObjEmpty = isObjEmpty;
exports.debounce = debounce;
exports.chunkArrayInGroups = chunkArrayInGroups;
exports.checkPokemonArray = exports.crossGenEvolve = exports.displayPokemon = exports.imageId = exports.capitalize = exports.pad = exports.getID = exports.duplicateCheck = exports.removeDuplicates = void 0;

var _react = _interopRequireDefault(require("react"));

var _PokemonImage = _interopRequireDefault(require("./components/PokemonImage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var capitalize = function capitalize(name) {
  return name.slice(0, 1).toUpperCase() + name.slice(1);
};

exports.capitalize = capitalize;

var imageId = function imageId(id) {
  return pad(id);
};

exports.imageId = imageId;

var getID = function getID(url, regex) {
  return Number(url.match(regex)[1]);
};

exports.getID = getID;

var pad = function pad(number) {
  var str = "" + number;

  while (str.length < 3) {
    str = "0" + str;
  }

  return str;
};

exports.pad = pad;
var crossGenEvolve = [112, 464, 113, 242, 117, 230, 125, 466, 126, 467, 233, 474, 176, 468, 183, 184, 221, 473, 315, 407, 356, 477, 25, 26, 126, 35, 36, 39, 40, 42, 169, 82, 462];
exports.crossGenEvolve = crossGenEvolve;

var displayPokemon = function displayPokemon(arr, length) {
  var array = [];

  switch (length) {
    case 3:
      // arr.map((pokemon) => (
      //   <PokemonImage className="ui tiny image mr" pokemon={pokemon}></PokemonImage>
      // ));
      break;
  } // arr.map((pokemon) => (
  //   <PokemonImage className="ui tiny image mr" pokemon={pokemon}></PokemonImage>
  // ));

};

exports.displayPokemon = displayPokemon;

var duplicateCheck = function duplicateCheck(search, index, arr) {
  return arr.indexOf(search) === index;
};

exports.duplicateCheck = duplicateCheck;

var removeDuplicates = function removeDuplicates(arr) {
  return arr.filter(function (v, i, a) {
    return a.findIndex(function (t) {
      return t.id === v.id;
    }) === i;
  });
};

exports.removeDuplicates = removeDuplicates;

function mergeDupes(arr) {
  var _ref;

  return _toConsumableArray(new Set((_ref = []).concat.apply(_ref, _toConsumableArray(arr))));
}

function isObjEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

function chunkArrayInGroups(arr, size) {
  var myArray = [];

  for (var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size));
  }

  return myArray;
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

var checkPokemonArray = function checkPokemonArray(pokemons) {
  if (pokemons === undefined || pokemons === null || !Array.isArray(pokemons) || pokemons.length === 0) {
    return false;
  }

  return true;
};

exports.checkPokemonArray = checkPokemonArray;