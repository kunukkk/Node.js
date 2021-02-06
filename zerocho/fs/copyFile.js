const fs = require("fs");

fs.copyFile("readme.txt", "writeme2.txt", (error) => {
  if (error) {
    console.error(error);
  }
  console.log("복사 완료");
});
