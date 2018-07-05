"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectRender = function () {
  function ObjectRender() {
    _classCallCheck(this, ObjectRender);
  }

  _createClass(ObjectRender, [{
    key: "generateForm",
    value: function generateForm(formProperties) {
      var _this = this;

      var hiddenFields = this.hiddenFields;
      var formResult = "<form action=\"" + (formProperties.formAction || "") + "\" method=\"" + formProperties.formMethod + "\" class=\"m-form\">";
      var objectProperties = Object.keys(this);
      objectProperties.forEach(function (property) {
        var fieldName = property.split("").slice(1, property.length).join("");
        var isHiddenField = typeof hiddenFields[fieldName] !== "undefined";
        var classAdding = isHiddenField ? "hide" : "";
        formResult += "<fieldset class=\"m-form__field " + classAdding + "\">\n        <label class=\"m-form__label\">" + (fieldName || "") + " : </label>\n        <input type=\"text\" name=\"" + (fieldName || "") + "\" value=\"" + (_this[property] || "") + "\" class=\"m-form__input\" />\n      </fieldset>";
      });
      formResult += "<p>\n        <input type=\"submit\" value=\"" + (formProperties.formTextSubmit || "") + "\" />\n      </p>\n    </form>";
      return formResult;
    }
  }, {
    key: "generateList",
    value: function generateList(currentObject) {}
  }]);

  return ObjectRender;
}();

module.exports = ObjectRender;