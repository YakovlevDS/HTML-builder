const path = require('path');
const fs = require('fs');
const {stdout} = process;

const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');// create  var path bundle.css
const stylesPath = path.join(__dirname, 'styles');// create var path styles.css

function createBundleCss(){
  fs.readdir(stylesPath , 'utf-8', (err, files)=> {// read directory
    if (err) throw err;
    fs.writeFile(bundlePath, '', err=>{// write directory in bundle
    if (err) throw err;
  });
  files.forEach(file=> {
      const pathExt=path.parse(path.join(stylesPath , file)).ext;

    if (pathExt === '.css') {
      let stream = fs.createReadStream(path.join(stylesPath , file)); //create stream read css file

      stream.on('data', (data) =>{//create listener data
        fs.appendFile(bundlePath, data, err=> {// We add data from css file to end bundle.css
          if (err) throw err;
        });
      });
    }});
    stdout.write(
      `Assembling CSS files from the "styles" folder to the bundle.css file is successful!`)
  });
}
createBundleCss();
    
