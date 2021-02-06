const fs = require("fs");

const readStream = fs.createReadStream("./readme.txt", { highWaterMark: 16 }); // highWaterMark: Buffer 크기 설정
const data = [];

readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log("data: ", chunk, chunk.length);
});

readStream.on("end", () => {
  console.log("end: ", Buffer.concat(data).toString());
});

readStream.on("error", (err) => {
  console.log("error: ", err);
});
