// require() 메소드는 객체를 리턴함
const user3 = require('./user3');

function showUser() {
	return user3.getUser().name + ', ' + user3.group.name;
}

console.log('사용자 정보 : %s', showUser());

