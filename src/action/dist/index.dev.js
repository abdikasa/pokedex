"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSearch = exports.setChartData = exports.iChooseYouNew = exports.iChooseYou = exports.fetchBio = exports.fetchEvolution = exports.fetchBioEvolution = exports.fetchAll = exports.getAbilities = void 0;

var _lodash = require("lodash");

var _Pokeapi = _interopRequireDefault(require("../api/Pokeapi"));

var _usefulFunctions = require("../usefulFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getAbilities = function getAbilities() {
  return function _callee(dispatch, getState) {
    var getAbility, pokeAbilities;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getAbility = function getAbility(data) {
              return getState().selected.abilities.map(function (poke) {
                return poke.ability[data];
              });
            };

            pokeAbilities = getAbility("name").map(function (ability) {
              return _Pokeapi["default"].get("/ability/".concat(ability));
            });
            _context.next = 4;
            return regeneratorRuntime.awrap(Promise.all(pokeAbilities));

          case 4:
            pokeAbilities = _context.sent;
            pokeAbilities = pokeAbilities.map(function (ability) {
              return ability.data["effect_entries"];
            }).flat().filter(function (ability) {
              return ability.language.name === "en";
            }).map(function (ability) {
              return ability.effect;
            });
            dispatch({
              type: "FETCH_ABILITIES",
              payload: {
                name: getAbility("name"),
                description: pokeAbilities
              }
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.getAbilities = getAbilities;

function fetchPokemonHelper(id) {
  return new Promise(function (resolve, reject) {
    return _Pokeapi["default"].get("/pokemon/" + id).then(function (pokemon) {
      return resolve(pokemon);
    })["catch"](function (err) {
      return reject();
    });
  });
}

var fetchAll = function fetchAll() {
  var defaultList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Array.from({
    length: 90
  }, function (_, i) {
    return i + 1;
  });
  return function _callee2(dispatch, getState) {
    var arr, result;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            arr = [];
            result = defaultList.reduce(function (accumulatorPromise, nextID) {
              return accumulatorPromise.then(function () {
                arr = arr.concat(fetchPokemonHelper(nextID));
                return arr;
              });
            }, Promise.resolve());
            result.then(function (res) {
              return Promise.all(res.map(function (promise, index) {
                return promise.then(function (poke) {
                  return poke.data;
                })["catch"](function (err) {
                  console.log("error is found: " + err);
                  console.log("promise error: ", promise);
                  return null;
                });
              }));
            }).then(function (arr) {
              dispatch({
                type: "FETCH_ALL",
                payload: arr
              });

              if (getState().searched.length === 0) {
                dispatch({
                  type: "SEARCHED",
                  payload: arr
                });
              }
            })["catch"](function (err) {
              return console.log("Something went wrong: " + err);
            }); // result.then(async () => {
            //   arr = (await Promise.all(arr)).map((pokemon) => pokemon.data);
            //   console.log("ran again", arr);
            //   dispatch({ type: "FETCH_ALL", payload: arr });
            //   if (getState().searched.length === 0) {
            //     dispatch({ type: "SEARCHED", payload: arr });
            //   }
            // });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
}; // export const fetchAll = () => async (dispatch, getState) => {
//   const response = await Pokeapi.get(`/pokemon/?offset=0&limit=807`);
//   const unresolved = response.data.results.map((pokemon) =>
//     getPokemon(pokemon, "pokemon", /\/pokemon\/(\d+)\//)
//   );
//   const results = (await Promise.all(unresolved)).map(
//     (pokemon) => pokemon.data
//   );
//   console.log(results);
//   dispatch({ type: "FETCH_ALL", payload: results });
//   if (getState().searched.length === 0) {
//     dispatch({ type: "SEARCHED", payload: results });
//   }
// };


exports.fetchAll = fetchAll;

var fetchBioEvolution = function fetchBioEvolution() {
  return function _callee3(dispatch, getState) {
    var hash, evolution;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (getState().selected.id) {
              _context3.next = 7;
              break;
            }

            hash = window.location.pathname.split("/")[2];

            if (!(hash.length > 0 && hash.length <= 3)) {
              _context3.next = 7;
              break;
            }

            if (!(+hash > 0 && +hash <= 807)) {
              _context3.next = 7;
              break;
            }

            hash = Number(hash);
            _context3.next = 7;
            return regeneratorRuntime.awrap(dispatch(iChooseYouNew(hash)));

          case 7:
            _context3.next = 9;
            return regeneratorRuntime.awrap(dispatch(fetchBio()));

          case 9:
            console.log("We have successfully fetched the bio of the pokemon", getState().bio);
            evolution = getState().bio.evolution_chain;
            console.log("We are about to fetch the evolution now", evolution); //get evolution

            _context3.next = 14;
            return regeneratorRuntime.awrap(dispatch(fetchEvolution(Number(evolution.url.match(/\/evolution-chain\/(\d+)\//)[1]))));

          case 14:
            console.log("We have fetched the evolution now", getState().evolution);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.fetchBioEvolution = fetchBioEvolution;

var fetchEvolution = function fetchEvolution(url) {
  return function _callee4(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(_Pokeapi["default"].get("/evolution-chain/".concat(url)));

          case 2:
            response = _context4.sent;
            dispatch({
              type: "FETCH_EVOLUTION",
              payload: response.data
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
};

exports.fetchEvolution = fetchEvolution;

var fetchBio = function fetchBio() {
  return function _callee5(dispatch, getState) {
    var response;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(_Pokeapi["default"].get("/pokemon-species/" + getState().selected.id));

          case 2:
            response = _context5.sent;
            dispatch({
              type: "FETCH_BIO",
              payload: response.data
            });

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    });
  };
};

exports.fetchBio = fetchBio;

var iChooseYou = function iChooseYou(event, data, href) {
  return function _callee6(dispatch) {
    var navEvent;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            event.preventDefault();

            if (!(event.metaKey || event.ctrlKey)) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return");

          case 3:
            window.history.pushState({}, "", href);
            navEvent = new PopStateEvent("popstate");
            window.dispatchEvent(navEvent);
            dispatch({
              type: "SELECTED",
              payload: data
            });
            dispatch({
              type: "FETCH_BIO",
              payload: {}
            });
            dispatch({
              type: "FETCH_EVOLUTION",
              payload: {}
            });

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    });
  };
};

exports.iChooseYou = iChooseYou;

var iChooseYouNew = function iChooseYouNew(hash) {
  return function _callee7(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return regeneratorRuntime.awrap(_Pokeapi["default"].get("/pokemon/" + hash));

          case 2:
            response = _context7.sent;
            dispatch({
              type: "SELECTED",
              payload: response.data
            });

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    });
  };
};

exports.iChooseYouNew = iChooseYouNew;

var setChartData = function setChartData(chartObject) {
  return function (dispatch) {
    dispatch({
      type: "setChart",
      payload: chartObject
    });
  };
};

exports.setChartData = setChartData;

var setSearch = function setSearch(q) {
  return function (dispatch, getState) {
    console.log("query is " + q, "state: ", getState());

    var searched = _toConsumableArray(getState().getAll).filter(function (pokemon) {
      console.log("setSearch", pokemon);
      return pokemon.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
    });

    dispatch({
      type: "SEARCHED",
      payload: searched
    });
  };
};

exports.setSearch = setSearch;