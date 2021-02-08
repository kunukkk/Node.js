let calc = require('./calc');

console.log('모듈로 분리한 후 - calc.add2 함수 호출 결과 : %d', calc.add2(10, 10));

let calc2 = require('./calc2');
console.log('모듈로 분리한 후 - calc2.add 함수 호출 결과 : %d', calc2.add(10, 10));
