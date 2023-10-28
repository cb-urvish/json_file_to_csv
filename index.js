const fs = require("fs");
const jsonToCsv = require('./converter');

// to read 'input.txt' file
const fileData = fs.readFileSync('./inputFile/input.txt'  , { encoding: "utf8", flag: "r", });

// parsed as JSON
const jsonData = JSON.parse(fileData);

jsonToCsv(jsonData);