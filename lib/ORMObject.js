"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ORMTranslator = require("./ORMTranslator");
var ObjectHelpers = require("./helpers/ObjectHelpers");

var ORMObject = function ORMObject(classCaller) {
  return function (_classCaller) {
    _inherits(_class, _classCaller);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: "find",
      value: function find() {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          ORMTranslator.findByParameter(_this2).then(function (queryResult) {
            var retour = [];
            queryResult.map(function (resultRow) {
              retour.push(ObjectHelpers.convertQueryResultToObject(resultRow, _this2));
            });
            resolve(retour);
            reject(function () {
              throw new Error("Query Exception");
            });
            reject(function () {
              throw new Error("Query Exception");
            });
          });
        });
      }
    }, {
      key: "delete",
      value: function _delete() {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
          ORMTranslator.findByParameter(_this3).then(function (queryResult) {
            ORMTranslator.deleteObject(_this3).then(function () {
              resolve(ObjectHelpers.convertQueryResultToObject(queryResult[0], _this3));
              reject(function () {
                throw new Error("Query Exception");
              });
            });
          });
        });
      }
    }, {
      key: "update",
      value: function update() {
        var _this4 = this;

        return new Promise(function (resolve, reject) {
          ORMTranslator.updateObject(_this4).then(function () {
            _this4.find().then(function (queryResult) {
              resolve(queryResult);
              reject(function () {
                throw new Error("Query Exception");
              });
            });
          });
        });
      }
    }, {
      key: "save",
      value: function save() {
        var _this5 = this;

        return new Promise(function (resolve, reject) {
          ORMTranslator.saveObjectToDatabase(_this5).then(function (queryResult) {
            var userID = queryResult[0].idUser;
            var userToFind = new _this5.constructor(userID);
            resolve(userToFind.find());
            reject(function () {
              throw new Error("Object cannot be find");
            });
          });
        });
      }
    }]);

    return _class;
  }(classCaller);
};

module.exports = ORMObject;