'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var parser = require('xml2json');

var ConfigurationService = function () {
  function ConfigurationService(filePath) {
    _classCallCheck(this, ConfigurationService);

    this.connectionConfigurationData = {};
    this.filePath = filePath;
    this.readConfiguration();
  }

  _createClass(ConfigurationService, [{
    key: 'readConfiguration',
    value: function readConfiguration() {
      this.connectionConfigurationData = JSON.parse(parser.toJson(fs.readFileSync(__dirname + this.filePath)));
    }
  }, {
    key: 'getConnectionDriver',
    value: function getConnectionDriver() {
      var connectionString = this.connectionConfigurationData.connectionString;
      return connectionString.database.connectorConfig;
    }
  }, {
    key: 'getConnectionConfiguration',
    value: function getConnectionConfiguration() {
      var connectionString = this.connectionConfigurationData.connectionString;
      var connectionName = this.getConnectionDriver();
      var connectionArrayConfig = connectionString.connector;
      for (var i = 0; i < connectionArrayConfig.length; i++) {
        var connectionConfig = connectionArrayConfig[i];
        if (connectionConfig.name.toLowerCase() === connectionName.toLowerCase()) return connectionConfig;
      };
      return false;
    }
  }, {
    key: 'getCurrentDriver',
    value: function getCurrentDriver() {
      var connectionString = this.connectionConfigurationData.connectionString;
      return connectionString.database.driver;
    }
  }, {
    key: 'getConnectionStringData',
    value: function getConnectionStringData() {
      var currentConfiguration = this.getConnectionConfiguration();
      var arrayConfiguration = currentConfiguration.connectionString.split(";");
      return JSON.parse('{ ' + arrayConfiguration.join(",").replace(/'/g, '"') + ' }');
    }
  }]);

  return ConfigurationService;
}();

var configuration = new ConfigurationService("/ConnectionString.xml");

module.exports = ConfigurationService;