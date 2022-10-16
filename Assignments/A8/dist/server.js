"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.use(_express["default"]["static"]("public"));
var port = process.env.PORT || 5050;
app.listen(port, function () {
  //link to the server
  console.log("Server: http://localhost:".concat(port));
});