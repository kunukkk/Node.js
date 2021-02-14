// require() 메소드는 함수를 리턴함
const user4 = require('./user4');

function showUser() {
  return user4().name + ', ' + 'No Group';
}

console.log('사용자 정보 : %s', showUser());
