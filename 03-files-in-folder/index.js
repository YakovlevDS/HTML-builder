const fs = require("fs");
const path = require("path");
const {stdout} = process;

let folderName = "secret-folder";
let dirPath = path.join(__dirname, folderName);

const infoFiles = (file) => {
  const pathFile = path.resolve(__dirname, folderName, file.name);

  fs.stat(pathFile, (err, status) => {
    if (err) throw err;

    const nameFile = path.parse(pathFile).name;
    const extFile = path.parse(pathFile).ext.substring(1);
    const sizeFile = `${status.size / 1024}Kb`;

    //  С выводом инфо created file
    // const createFile = status.birthtime;
    // const date = createFile.getDate();
    // const month = String(createFile.getMonth() + 1);
    // const year = createFile.getFullYear();
    // const hours = createFile.getHours();
    // const minutes = createFile.getMinutes();
    // const dateCreate = `${date}.${month}.${year} ${hours}:${minutes}`;
    // stdout.write(`${nameFile} size:${sizeFile} created: ${dateCreate}\n`);
    stdout.write(`${nameFile} - ${extFile} - ${sizeFile}\n`);
  });
};

const itemIsFile = () => {
  fs.readdir(dirPath, {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    files.forEach((i) => {
      if (i.isFile()) infoFiles(i);
    });
  });
};
itemIsFile();
