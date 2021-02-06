let util = require("util");
let EventEmitter = require("events").EventEmitter;

let Calc = function () {
  let self = this;

  // on(event, listener) : 지정한 이벤트의 리스너를 추가
  this.on("stop", function () {
    console.log("Calc에 stop event 전달됨.");
  });
};

// process 객체에는 이미 내부적으로 EventEmitter를 상속받지만
// 새로운 객체를 생성할 경우 EventEmitter를 상속해주어야 한다.
util.inherits(Calc, EventEmitter);

Calc.prototype.add = function (a, b) {
  return a + b;
};

module.exports = Calc;
module.exports.title = "calculator";
