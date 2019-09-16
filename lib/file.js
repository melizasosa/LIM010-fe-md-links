"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filePathExists = void 0;

// Contiene utilidads para la manipulación y trasnformacion de arhivos
const fs = require('fs');

const filePathExists = filePath => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err && err.code === 'ENOENT') {
        console.log(false);
        return resolve(false);
      } else if (err) {
        console.log(err);
        return reject(err);
      }

      if (stats.isFile() || stats.isDirectory()) {
        console.log(true);
        return resolve(true);
      }
    });
  });
};

exports.filePathExists = filePathExists;
filePathExists('prueba\\archivo.md');