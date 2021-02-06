const crypto = require("crypto");

console.log(
  "base64: ",
  crypto.createHash("sha512").update("1234").digest("base64")
);

console.log("--------------------------------------------");

console.log("hex: ", crypto.createHash("sha512").update("1234").digest("hex"));

console.log("--------------------------------------------");

console.log(
  "base64: ",
  crypto.createHash("sha512").update("5678").digest("base64")
);
