"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//Tayla Orsmond u21467456

//importing the express module

var app = (0, _express["default"])();
app.use(_express["default"]["static"]("public"));
var PORT = 5050;
app.listen(PORT, function () {
  console.log("Listening on: http://localhost:".concat(PORT, "/"));
});