// require() 메소드는 exports가 아닌 module.exports로 설정된 속성을 리턴함
const user5 = require('./user5');

function showUser() {
	return user5.getUser().name + ', ' + user5.group.name;
}

console.log('사용자 정보 : %s', showUser());

