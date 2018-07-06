'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DeployementTask = require("./deployement/DeployementTask");

_DeployementTask.copyConfiguration();

var _ORMObjectDefault = require("./ORMObject.js");

var _ORMObject = _interopRequireDefault(_ORMObjectDefault);

var _ObjectTaggerDefault = require("./decorator/ObjectTagger.js");

var _ObjectTagger = _interopRequireDefault(_ObjectTaggerDefault);

var _ObjectRenderDefault = require("./generator/ObjectRender.js");

var _ObjectRender = _interopRequireDefault(_ObjectRenderDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ORMObject = _ORMObject.default;
exports.ObjectTagger = _ObjectTagger.default;
exports.ObjectRender = _ObjectRender.default;