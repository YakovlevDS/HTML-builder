const fs = require("fs");
const path = require("path");
const {stdin, stdout, exit} = process;

const fileName ="text.txt"
const pathToFile =path.join(__dirname, fileName);
let stream = fs.createWriteStream(pathToFile);

const exitPhrase=()=> {
    stdout.write("\n Goodbye!");
    exit();
  }

stdout.write("Hello please enter below the text for writing it to the file or 'exit' for EXIT: \n");

stdin.on("data", str => 
  (''+ str).trim()==="exit" ? exitPhrase() : stream.write(str));

process.on('SIGINT', exitPhrase);




