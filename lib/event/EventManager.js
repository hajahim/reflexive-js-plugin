'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events');
var EventAction = require('./action/EventAction');

var EventManager = function (_EventEmitter) {
  _inherits(EventManager, _EventEmitter);

  function EventManager() {
    _classCallCheck(this, EventManager);

    var _this = _possibleConstructorReturn(this, (EventManager.__proto__ || Object.getPrototypeOf(EventManager)).call(this));

    _this.on("OBJECT:TYPE:CREATE", EventAction.notifyDatabaseObjectInstanced);
    return _this;
  }

  _createClass(EventManager, [{
    key: 'trigger',
    value: function trigger(eventName, eventArgs) {
      this.emit(eventName, eventArgs);
    }
  }]);

  return EventManager;
}(EventEmitter);

var eventManager = new EventManager();

module.exports = eventManager;