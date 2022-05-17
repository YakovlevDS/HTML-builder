// 1. Создаёт папку  **project-dist**.
// 2. Заменяет шаблонные теги в файле **template.html** с названиями файлов из папки components (пример:```{{section}}```) на содержимое одноимённых компонентов и  сохраняет результат в **project-dist/index.html**.
// 3. Собирает в единый файл стили из папки **styles** и помещает их в файл **project-dist/style.css**.
// 4. Копирует папку **assets** в **project-dist/assets**

const path = require("path");
const fs = require("fs");

// path distination files
const dist = path.join(__dirname, "project-dist");
const assetsPathDist = path.join(dist, "assets");
// path src files
const assetsPathSrc = path.join(__dirname, "assets");
const stylesPathSrc = path.join(__dirname, "styles");
const htmlPathSrc = path.join(__dirname, "components");

fs.readdir(stylesPathSrc, {withFileTypes: true}, async (e, files) => {
  if (e) console.log(e);
  else {
    files.forEach((file, ind) => {
      let filePath = path.join(stylesPathSrc, file.name);
      const ext = file.name.split(".")[1];
      if (file.isFile() && ext === "css") {
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            console.log(err);
          } else if (!ind) {
            fs.writeFile(path.join(dist, "style.css"), data, (e) => {
              if (e) console.log(e);
            });
          } else {
            fs.appendFile(path.join(dist, "style.css"), data, (err) => {
              if (err) console.log(err);
            });
          }
        });
      }
    });
  }
});

function recCopy(srcPathDir, distPathDir) {
  fs.readdir(srcPathDir, {withFileTypes: true}, (e, files) => {
    if (e) throw e;
    files.forEach((file) => {
      const srcPathFile = path.join(srcPathDir, file.name);
      const distPathFile = path.join(distPathDir, file.name);
      if (file.isDirectory()) {
        fs.stat(distPathFile, (e) => {
          if (e) {
            fs.mkdir(distPathFile, (e) => {
              if (e) {
                return console.log(e);
              }
            });
            recCopy(srcPathFile, distPathFile);
          } else {
            recCopy(srcPathFile, distPathFile);
          }
        });
      } else {
        fs.copyFile(srcPathFile, distPathFile, (e) => {
          if (e) throw e;
        });
      }
    });
  });
}
fs.stat(dist, (e) => {
  if (e) {
    fs.mkdir(dist, (e) => {
      if (e) throw e;
    });
    createTemplate();
  } else {
    fs.readdir(dist, (e) => {
      if (e) throw e;
      createTemplate();
    });
  }
});

fs.stat(assetsPathDist, (e) => {
  if (e) {
    fs.mkdir(assetsPathDist, (e) => {
      if (e) throw e;
    });
    recCopy(assetsPathSrc, assetsPathDist);
  } else {
    recCopy(assetsPathSrc, assetsPathDist);
  }
});

function createTemplate() {
  const pathTemp = path.join(__dirname, "template.html");
  const pathDist = path.join(dist, "index.html");
  fs.copyFile(pathTemp, pathDist, (e) => {
    if (e) throw e;
    fs.readFile(pathDist, "utf8", (e, data) => {
      if (e) throw e;
      fs.readdir(htmlPathSrc, {withFileTypes: true}, (e, files) => {
        if (e) throw e;

        files.forEach((i) => {
          const p = path.join(htmlPathSrc, i.name);
          fs.readFile(p, "utf8", (e, dataFile) => {
            if (e) throw e;
            let tagName = `{{${i.name.split(".")[0]}}}`;
            data = data.replace(tagName, dataFile);
            fs.writeFile(pathDist, data, (e) => {
              if (e) throw e;
            });
          });
        });
      });
    });
  });
}
