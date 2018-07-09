'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var fs = require('fs');

var DeployementTask = function () {
  function DeployementTask() {
    _classCallCheck(this, DeployementTask);

    this.appRoot = path.dirname(require.main.filename || process.mainModule.filename);
    this.moduleConfiguration = __dirname + "\\config\\ConnectionString.xml";
  }

  _createClass(DeployementTask, [{
    key: 'searchFileDeeper',
    value: function searchFileDeeper(dir, pattern) {
      var _this = this;

      var results = [];
      fs.readdirSync(dir).forEach(function (dirInner) {
        if (dirInner.toLowerCase().indexOf("node_modules") > -1 || dirInner.toLowerCase().indexOf("objects") > -1 || dirInner.toLowerCase().indexOf("refs") > -1) return;
        dirInner = path.resolve(dir, dirInner);
        var stat = fs.statSync(dirInner);
        if (stat.isDirectory()) {
          results = results.concat(_this.searchFileDeeper(dirInner, pattern));
        }
        if (stat.isFile() && dirInner.endsWith(pattern)) {
          results.push(dirInner);
        }
      });
      return results;
    }
  }, {
    key: 'copyConfiguration',
    value: function copyConfiguration() {
      var applicationRootConfiguration = this.searchFileDeeper(this.appRoot, 'ConnectionString.xml');
      console.log('<------- Deployement start -------->');
      fs.writeFile(applicationRootConfiguration[0], this.moduleConfiguration, function (err) {
        if (err) throw err;
        console.log('<------- Deployement ended -------->');
      });
    }
  }]);

  return DeployementTask;
}();

var deployement = new DeployementTask();

module.exports = deployement;