let path = require('path');

// 디렉터리 이름 합치기
let directories = ['users', 'mike', 'docs'];
let docsDirectory = directories.join(path.sep);
console.log('문서 디렉터리 : %s', docsDirectory);

//디렉터리 이름과 파일 이름 합치기
let curPath = path.join('/Users/mike', 'notepad.exe');
console.log('파일 패스 : %s', curPath);

let filename = 'C:\\Users\\mike\\notepad.exe';
let dirname = path.dirname(filename);
let basename = path.basename(filename);
let extname = path.extname(filename);

console.log('디렉터리 : %s, 파일 이름 : %s, 확장자 : %s', dirname, basename, extname);
