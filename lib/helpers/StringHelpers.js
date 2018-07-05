'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StringHelpers = function () {
  function StringHelpers() {
    _classCallCheck(this, StringHelpers);
  }

  _createClass(StringHelpers, null, [{
    key: 'replacePlaceholder',
    value: function replacePlaceholder(string, arrayToReplace) {
      if (typeof string === "string" && arrayToReplace instanceof Array) {
        return string.replace(/({\d})/g, function (i) {
          return arrayToReplace[i.replace(/{/, '').replace(/}/, '')];
        });
      } else if (typeof string === "string" && arrayToReplace instanceof Object) {
        for (var key in arrayToReplace) {
          return string.replace(/({([^}]+)})/g, function (i) {
            var key = i.replace(/{/, "").replace(/}/, "");
            if (!arrayToReplace[key]) return i;
            return arrayToReplace[key];
          });
        }
      } else {
        return false;
      }
    }
  }]);

  return StringHelpers;
}();

module.exports = StringHelpers;