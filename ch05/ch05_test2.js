let http = require("http");

// 웹 서버 객체를 만듭니다
let server = http.createServer();

// 웹 서버를 시작하여 3000번 포트에서 대기하도록 설정합니다
let host = "172.20.10.6";
let port = 3000;
server.listen(port, host, 50000, function () {
  console.log("웹 서버가 시작되었습니다. : %s:%d", host, port);
});

// 클라이언트 연결 이벤트 처리
// 연결이 만들어져 콜백 함수가 호출될 때는 socket 객체가 파라미터로 전달됨
// socket 객체는 클라이언트 연결 정보를 담고 있으므로 address() 메소드를 호출하여
// 클라이언트의 IP와 포트 정보를 확인할 수 있음
server.on("connection", function (socket) {
  let addr = socket.address();
  console.log("클라이언트가 접속했습니다. : %s, %d", addr.address, addr.port);
});

// 클라이언트 요청 이벤트 처리
server.on("request", function (req, res) {
  console.log("클라이언트 요청이 들어왔습니다.");
  //  console.dir(req);

  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.write("<h1>웹서버로부터 받은 응답</h1>");
  res.end();
});

// 서버 종료 이벤트 처리
server.on("close", function () {
  console.log("서버가 종료됩니다.");
});
