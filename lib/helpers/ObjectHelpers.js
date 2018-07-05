"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectHelpers = function () {
  function ObjectHelpers() {
    _classCallCheck(this, ObjectHelpers);
  }

  _createClass(ObjectHelpers, null, [{
    key: "generateWhereClause",


    /**
     * @function generateWhereClause
     * @param {Object} objectToMap - object to be mapped into attribute array value
     * @description convert object to attribute/value result
     * @return {Array} example [ "parameter1=value1", "parameter2=value2" ]
     */
    value: function generateWhereClause(objectToMap) {
      var objectAttributes = Object.keys(objectToMap);
      var retour = {};
      objectAttributes.map(function (currentAttribute, index) {
        var objectValue = objectToMap[currentAttribute.slice(1, currentAttribute.length)];
        var haveNotValue = typeof objectValue === "undefined" || !objectValue;
        if (haveNotValue) return;
        retour[currentAttribute.slice(1, currentAttribute.length)] = objectValue;
      });
      return retour;
    }
  }, {
    key: "convertQueryResultToObject",
    value: function convertQueryResultToObject(queryResult, objectType) {
      var newObject = new objectType.constructor();
      var objectAttributes = Object.keys(newObject);
      objectAttributes.map(function (attribute) {
        newObject[attribute.slice(1, attribute.length)] = queryResult[attribute.slice(1, attribute.length)];
      });
      return newObject;
    }
  }, {
    key: "findProperty",
    value: function findProperty(objectToMap, propertyName) {
      var method = null;
      try {
        method = objectToMap[propertyName];
      } catch (methodNotFoundException) {
        throw new Error("Method not found exception : " + methodNotFoundException);
      }
      return method;
    }
  }]);

  return ObjectHelpers;
}();

module.exports = ObjectHelpers;