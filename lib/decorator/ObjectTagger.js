"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventManager = require('../event/EventManager');

var ObjectTagger = function () {
  function ObjectTagger() {
    _classCallCheck(this, ObjectTagger);
  }

  _createClass(ObjectTagger, null, [{
    key: "annotate",
    value: function annotate(decoratorProperty) {
      function annotateFied(target, key, descriptor) {
        if (typeof target.configurationField === "undefined") target.configurationField = {};
        target.configurationField[key] = decoratorProperty;
      }
      return annotateFied;
    }
  }, {
    key: "Entity",
    value: function Entity(ojectProperties) {
      return function decorator(Class) {
        EventManager.trigger("OBJECT:TYPE:CREATE", [Class, ojectProperties]);
        return function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return new (Function.prototype.bind.apply(Class, [null].concat(args)))();
        };
      };
    }
  }, {
    key: "hidden",
    value: function hidden(target, key) {
      if (typeof target.hiddenFields === "undefined") target.hiddenFields = {};
      target.hiddenFields[key] = "true";
    }
  }]);

  return ObjectTagger;
}();

module.exports = ObjectTagger;