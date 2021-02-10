// 사용 패턴 : exports에 속성으로 추가된 함수 객체를 그대로 참조한 후 호출함

const user7_1 = require('./user7').printUser;

user7_1();

const user7_2 = require('./user7');

user7_2.printUser();
