let http = require('http');

let options = {
  host: 'www.google.com',
  port: 80,
  path: '/',
};

// GET: 다른 사이트에 데이터 요청
//      첫번째 파라미터는 다른 사이트의 정보
let req = http.get(options, function (res) {
  // 응답 처리
  let resData = '';
  res.on('data', function (chunk) {
    resData += chunk;
  });

  res.on('end', function () {
    console.log(resData);
  });
});

req.on('error', function (err) {
  console.log('오류 발생 : ' + err.message);
});
