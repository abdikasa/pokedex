"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//location.pathname.match(/\/pokemon\/(\d+)/)
var Route = function Route(_ref) {
  var path = _ref.path,
      children = _ref.children;

  var _useState = (0, _react.useState)(window.location.pathname),
      _useState2 = _slicedToArray(_useState, 2),
      mypath = _useState2[0],
      setPath = _useState2[1];

  (0, _react.useEffect)(function () {
    //detect change
    console.log("inside url change", path, mypath);

    var urlChange = function urlChange() {
      var match = window.location.pathname.match(/\/pokemon\/(\d+)/);
      console.log("matched", match);

      if (match) {
        ///pokemon is found
        console.log("/pokemon");
        setPath("/pokemon");
      } else {
        if (window.location.pathname === "/") {
          console.log("/");
          setPath("/");
        } else {
          console.log("does not exist");
          setPath("page-not-found");
        }
      }
    };

    urlChange();
    window.addEventListener("popstate", urlChange);
    return function () {
      window.removeEventListener("popstate", urlChange);
    };
  }, []);
  return path === mypath ? children : null;
};

var _default = Route;
exports["default"] = _default;