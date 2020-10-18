let util = require("util");
let EventEmitter = require("events").EventEmitter;

let Calc = function () {
  let self = this;

  // on(event, listener) : 지정한 이벤트의 리스너를 추가
  this.on("stop", function () {
    console.log("Calc에 stop event 전달됨.");
  });
};

// prototype 상속을 연결해준다.
util.inherits(Calc, EventEmitter);

Calc.prototype.add = function (a, b) {
  return a + b;
};

module.exports = Calc;
module.exports.title = "calculator";
