"use strict";

var _add = _interopRequireDefault(require("./operations/add.js"));
var _substract = _interopRequireDefault(require("./operations/substract.js"));
var _multiply = _interopRequireDefault(require("./operations/multiply.js"));
var _divide = _interopRequireDefault(require("./operations/divide.js"));
var _logFile = _interopRequireDefault(require("./operations/logFile.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var script = process.argv;
// console.log(script);  // gives array for path to node script & arguments.
var operation = script[2];
var arg1 = script[3] - '0';
// console.log(typeof(arg1))
var arg2 = script[4] - '0';
// console.log(arg1)
// let k = 8;
var result;
try {
  switch (operation) {
    case 'add':
      result = (0, _add["default"])(arg1, arg2);
      break;
    case 'substract':
      result = (0, _substract["default"])(arg1, arg2);
      break;
    case 'multiply':
      result = (0, _multiply["default"])(arg1, arg2);
      break;
    case 'divide':
      result = (0, _divide["default"])(arg1, arg2);
      break;
    default:
      throw new Error("Invalid");
  }
  console.log("The ".concat(operation, " operation of ").concat(arg1, " & ").concat(arg2, " is"), result);
  (0, _logFile["default"])(operation, arg1, arg2, result);
} catch (err) {
  console.log("Invalid operation");
}
