// 사용 패턴 : module.exports에 프로토타입 객체를 정의한 후 할당함

const User = require('./user10');
let user = new User('test01', '소녀시대');

user.printUser();
