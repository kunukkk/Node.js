let http = require('http');

let opts = {
  host: 'www.google.com',
  port: 80,
  method: 'POST',
  path: '/',
  hearders: {},
};

let resData = '';
let req = http.request(opts, function (res) {
  // 응답 처리
  res.on('data', function (chunk) {
    resData += chunk;
  });

  res.on('end', function () {
    console.log(resData);
  });
});

// POST 방식에서는 헤더와 본문을 모두 직접 설정
opts.hearders['Content-Type'] = 'application/x-www-form-urlencoded';
req.data = 'q=actor';
opts.hearders['Content-Length'] = req.data.length;

req.on('error', function (err) {
  console.log('오류 발생 : ' + err.message);
});

req.write(req.data);
req.end();
