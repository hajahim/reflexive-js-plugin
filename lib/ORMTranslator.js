"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StringHelpers = require("./helpers/StringHelpers");
var ObjectHelpers = require("./helpers/ObjectHelpers");
var Configuration = require("./config/ConfigurationParser");
var GenericSQL = require("./helpers/GenericSQL");
var currentDriver = Configuration.getCurrentDriver();
var connectorConfiguration = Configuration.getConnectionStringData();
var Connector = require("./database/" + currentDriver);

var DataBaseConnector = new Connector(connectorConfiguration);
var queryBuilder = new GenericSQL(Configuration.getConnectionDriver());

var ORMTranslator = function () {
  function ORMTranslator() {
    _classCallCheck(this, ORMTranslator);
  }

  _createClass(ORMTranslator, null, [{
    key: "findByParameter",
    value: function findByParameter(objectToMap) {
      var tableName = objectToMap.constructor.name;
      var whereClause = ObjectHelpers.generateWhereClause(objectToMap);
      var query = queryBuilder.selectByParameter(tableName, whereClause);
      return DataBaseConnector.queryDatabase(query);
    }
  }, {
    key: "saveObjectToDatabase",
    value: function saveObjectToDatabase(currentObject) {
      var className = currentObject.constructor.name;
      var jsonObject = {};
      var objectProperties = Object.keys(currentObject);
      objectProperties.slice(1, objectProperties.length).map(function (attribute) {
        var getter = attribute.split("").slice(1, attribute.length).join("");
        jsonObject[getter] = currentObject[attribute];
      });
      var query = queryBuilder.insertDataQuery(className, jsonObject, currentObject.getId());
      return DataBaseConnector.queryDatabase(query);
    }
  }, {
    key: "deleteObject",
    value: function deleteObject(currentObject) {
      var tableName = currentObject.constructor.name;
      var whereClause = ObjectHelpers.generateWhereClause(currentObject);
      var query = queryBuilder.deleteQuery(tableName, whereClause);
      return DataBaseConnector.queryDatabase(query);
    }
  }, {
    key: "updateObject",
    value: function updateObject(currentObject) {
      var tableName = currentObject.constructor.name;
      var properties = ObjectHelpers.generateWhereClause(currentObject);
      var whereClause = {};
      whereClause[currentObject.getId()] = currentObject[currentObject.getId()];
      var query = queryBuilder.updateQuery(tableName, properties, whereClause);
      return DataBaseConnector.queryDatabase(query);
    }
  }, {
    key: "checkingObjectSubscription",
    value: function checkingObjectSubscription(objectName) {
      var databaseQuery = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '" + objectName + "'";
      return DataBaseConnector.queryDatabase(databaseQuery);
    }
  }, {
    key: "generateObjectQuery",
    value: function generateObjectQuery(tableName, objectProperties) {
      return queryBuilder.createTableQuery(tableName, objectProperties);
    }
  }, {
    key: "suscribeObject",
    value: function suscribeObject(objectParameter) {
      var _this = this;

      var _objectParameter = _slicedToArray(objectParameter, 2),
          currentObject = _objectParameter[0],
          objectProperties = _objectParameter[1];

      var tableName = currentObject.name;
      var isObjectAlreadySuscribe = this.checkingObjectSubscription(tableName);
      return new Promise(function (resolve, reject) {
        isObjectAlreadySuscribe.then(function (queryResult) {
          try {
            if (queryResult.length === 0) {
              var queryString = _this.generateObjectQuery(tableName, objectProperties);
              resolve(DataBaseConnector.queryDatabase(queryString));
            } else {
              resolve();
            }
          } catch (queryException) {
            reject();
            throw new Error("Exception throw at : " + queryException);
          }
        });
      });
    }
  }]);

  return ORMTranslator;
}();

module.exports = ORMTranslator;