'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenericSQL = function () {
  function GenericSQL(driverName) {
    _classCallCheck(this, GenericSQL);

    this.knexInstance = require('knex')({
      client: driverName
    });
  }

  _createClass(GenericSQL, [{
    key: 'createTableQuery',
    value: function createTableQuery(tableName, properties) {
      var queryCreate = this.knexInstance.schema.withSchema('public').createTable(tableName, function (table) {
        Object.keys(properties).map(function (propertyName) {
          var propertyValues = properties[propertyName];
          var isPrimary = typeof propertyValues.isPrimaryKey !== "undefined" && propertyValues.isPrimaryKey;
          if (isPrimary) table.increments('' + propertyName);else if (propertyValues.type === "VARCHAR") table.string('' + propertyName);else table.integer('' + propertyName);
        });
      });
      return queryCreate.toString();
    }
  }, {
    key: 'insertDataQuery',
    value: function insertDataQuery(tableName, values, idName) {
      return this.knexInstance(tableName).returning(idName).insert(values).toString();
    }
  }, {
    key: 'selectByParameter',
    value: function selectByParameter(tableName, whereClause) {
      return this.knexInstance(tableName).select('*').where(whereClause).toString();
    }
  }, {
    key: 'deleteQuery',
    value: function deleteQuery(tableName, whereClause) {
      return this.knexInstance(tableName).where(whereClause).del().toString();
    }
  }, {
    key: 'updateQuery',
    value: function updateQuery(tableName, properties, whereClause) {
      return this.knexInstance(tableName).where(whereClause).update(properties);
    }
  }]);

  return GenericSQL;
}();

module.exports = GenericSQL;