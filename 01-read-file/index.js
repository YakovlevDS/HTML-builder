//! solution for any files

const fs = require('fs');
const path = require('path');

const {stdout} = process;
const nameTargetFile = 'text.txt';
const pathToFile = path.join(__dirname, nameTargetFile);
const stream = fs.createReadStream(pathToFile);
let strData = '';

stream.on('data', (strPartData) => (strData += strPartData));
stream.on('end', () => stdout.write(strData));

// !solution for small files

// const fs = require('fs');
// const path = require('path');

// const { stdout } = process;
// fs.readFile(
//     path.join(__dirname, 'text.txt'),
//     'utf-8',
//     (err, data) => {
//         if (err) throw err;
//         stdout.write(data);
//     }
// );
