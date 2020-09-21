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
server.on("connection", function (socket) {
  let addr = socket.address();
  console.log("클라이언트가 접속했습니다. : %s, %d", addr.address, addr.port);
});

// 클라이언트 요청 이벤트 처리
server.on("request", function (req, res) {
  console.log("클라이언트 요청이 들어왔습니다.");

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<!DOCTYPE html>");
  res.write("<html>");
  res.write("<head>");
  res.write("<title>응답 페이지</title>");
  res.write("</head>");
  res.write("<body>");
  res.write("<h1>Node.js로부터의 응답 페이지</h1>");
  res.write("</body>");
  res.write("</html>");
  res.end();
});

// 서버 종료 이벤트 처리
server.on("close", function () {
  console.log("서버가 종료됩니다.");
});
