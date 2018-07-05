"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MSSQLDriver = require("mssql");

var Connection = null;

var MSSQLConnector = function () {
  function MSSQLConnector(configuration) {
    _classCallCheck(this, MSSQLConnector);

    this.configuration = configuration || this.getDefaultConfiguration();
  }

  _createClass(MSSQLConnector, [{
    key: "getDefaultConfiguration",
    value: function getDefaultConfiguration() {
      return {
        user: "sa",
        password: "Asdcxz1+",
        server: "localhost",
        database: "RSJDatabase",
        options: {
          encrypt: true // Use this if you're on Windows Azure
        }
      };
    }
  }, {
    key: "getConnection",
    value: function getConnection() {
      try {
        if (Connection === null) Connection = MSSQLDriver.connect(this.configuration);
      } catch (ConnectionDatabaseException) {
        throw new Error("Database connect exception : " + ConnectionDatabaseException);
      }
      return Connection;
    }
  }, {
    key: "queryDatabase",
    value: function queryDatabase(query) {
      var queryResult = null;
      try {
        var connection = this.getConnection();
        queryResult = new Promise(function (resolve, reject) {
          connection.then(function (dbInstance) {
            dbInstance.request().query(query).then(function (responseQuery) {
              resolve(responseQuery.recordset);
              reject(function () {
                throw new Error("Can't connect to DB");
              });
            });
          });
        });
      } catch (DatabaseQueryException) {
        queryResult.reject(DatabaseQueryException);
        throw new Error("Query connect exception : " + DatabaseQueryException);
      }
      return queryResult;
    }
  }]);

  return MSSQLConnector;
}();

module.exports = MSSQLConnector;