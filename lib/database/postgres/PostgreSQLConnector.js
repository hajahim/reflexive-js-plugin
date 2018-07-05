"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('pg'),
    Client = _require.Client;

var Connection = null;

var PostgreSQLConnector = function () {
  function PostgreSQLConnector(configuration) {
    _classCallCheck(this, PostgreSQLConnector);

    this.configuration = configuration || this.getDefaultConfiguration();
  }

  _createClass(PostgreSQLConnector, [{
    key: "getDefaultConfiguration",
    value: function getDefaultConfiguration() {
      return {
        user: "sa",
        password: "Asdcxz1+",
        host: "localhost",
        port: "5432",
        database: "RSJDatabase"
      };
    }
  }, {
    key: "getConnection",
    value: function getConnection() {
      try {
        if (Connection === null) {
          Connection = new Client(this.configuration);
          Connection.connect();
        }
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
          connection.query(query, function (error, responseQuery) {
            resolve(responseQuery.rows);
          });
        }).catch(function (error) {
          throw new Error("Can't connect to DB : " + error);
        });
      } catch (DatabaseQueryException) {
        queryResult.reject(DatabaseQueryException);
        throw new Error("Query connect exception : " + DatabaseQueryException);
      }
      return queryResult;
    }
  }]);

  return PostgreSQLConnector;
}();

module.exports = PostgreSQLConnector;