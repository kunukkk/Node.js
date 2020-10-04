calc = {};
calc.add1 = function (a, b) {
  return a + b;
};

console.log(
  "모듈로 분리하기 전 - calc.add1 함수 호출 결과 : %d",
  calc.add1(10, 10)
);

console.log(calc);
