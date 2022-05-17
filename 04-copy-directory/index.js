const path = require("path");
const promis = require("fs/promises");
const {stdout} = process;

const pathDirSrc = path.join(__dirname, "files");
const pathDirDist = path.join(__dirname, "files-copy");

function copyDir() {
  promis
    .rm(pathDirDist, {
      // delete directory files-copy
      recursive: true,
      force: true,
    })
    .finally(() => {
      promis.mkdir(pathDirDist, {
        // create directory files-copy
        recursive: true,
      });

      promis
        .readdir(pathDirSrc, {
          //read target directory only files type
          withFileTypes: true,
        })
        .then((files) => {
          files.forEach((i) => {
            //iterate by all files
            if (i.isFile()) {
              let pathFileSrc = path.join(pathDirSrc, i.name);
              let pathFileDist = path.join(pathDirDist, i.name);
              promis.copyFile(pathFileSrc, pathFileDist); //copy files with path
            }
          });
          stdout.write(
            `Copying files from the 'files' folder to the 'files-copy' folder is successful!`
          );
        });
    });
}

copyDir();
