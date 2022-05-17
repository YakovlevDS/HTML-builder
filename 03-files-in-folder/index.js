
const fs = require('fs');
const path = require('path');
const { stdout } = process;

let folderName = 'secret-folder';
let dirPath = path.join(__dirname, folderName);

const infoFiles = (file) => {
  const pathFile = path.resolve(__dirname, folderName, file.name);

  fs.stat(pathFile, (err, status) => {
    if (err) throw err;
    const nameFile = path.basename(file.name);
    const sizeFile = `${Math.round(status.size / 1024)}Kb`;
    const createFile = status.birthtime;
    const date = createFile.getDate();
    const month = String(createFile.getMonth() + 1);
    const year = createFile.getFullYear();
    const hours = createFile.getHours();
    const minutes = createFile.getMinutes();
    const dateCreate = `${date}.${month}.${year} ${hours}:${minutes}`;
    stdout.write(`${nameFile} size:${sizeFile} created: ${dateCreate}\n`);
  });
};

const itemIsFile = () => {
  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(i => {
      if (i.isFile()) infoFiles(i);
    });
  });
};
itemIsFile();

