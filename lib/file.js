"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFileMd = exports.filePathExists = void 0;

// Contiene utilidads para la manipulación y trasnformacion de arhivos
const fs = require('fs');

const pathModule = require('path'); // VERIFICAR SI ES ARCHIVO


const filePathExists = nameFile => {
  let isItFile = fs.stat(nameFile);
  return isItFile.isFile();
}; // OBTENER SÓLO LOS ARCHIVOS CON EXTENSIÓN .MD


exports.filePathExists = filePathExists;

const isFileMd = file => {
  return pathModule.extname(file);
};

exports.isFileMd = isFileMd;