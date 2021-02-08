let fs = require('fs');

// 파일을 비동기식 IO로 읽어 들입니다
// readFile: 비동기식(+콜백함수)
fs.readFile('./package.json', 'utf8', function (err, data) {
  // 일어 들인 데이터 출력
  console.log(data);
});

console.log('프로젝트 폴더 안의 package.json 파일을 읽도록 요청했습니다.');
