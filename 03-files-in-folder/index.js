
const fs = require('fs');
const path = require('path');
const {stdout } = process;

let folderName='secret-folder';
let dirPath= path.join(__dirname, folderName);

const infoFiles = (file)=> {
    const pathFile=path.resolve(__dirname, folderName, file.name);

    fs.stat(pathFile,  (err, status)=> {
    if (err) throw err;
     const nameFile=path.basename(file.name);
    const sizeFile=`${Math.round(status.size/1024)}Kb`;
    const createFile=status.birthtime;
    const dateCreate=`${createFile.getDate()}.${String(createFile.getMonth() + 1)}.${createFile.getFullYear()} ${createFile.getHours()}:${createFile.getMinutes()}`
     stdout.write(`${nameFile} size:${sizeFile} created: ${dateCreate}\n`);
    });
  }

const  itemIsFile =()=>{
    fs.readdir(dirPath, { withFileTypes: true },(err, files)=> {
        if (err) throw err;
        files.forEach(i => {if (i.isFile()) infoFiles(i)});
})};
itemIsFile();

