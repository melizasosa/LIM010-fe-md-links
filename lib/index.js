"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.functionReadAllFiles = exports.functionReadFileS = exports.functionIsFileMd = exports.functionFilePathExists = exports.functionTypePath = void 0;

// Contiene utilidads para la manipulación y trasnformacion de arhivos
const fs = require('fs');

const pathModule = require('path');

const functionTypePath = inputPath => {
  if (!pathModule.isAbsolute(inputPath)) {
    return pathModule.resolve(inputPath);
  }

  return inputPath;
}; // VERIFICAR SI ES ARCHIVO


exports.functionTypePath = functionTypePath;

const functionFilePathExists = nameFile => {
  const isItFile = fs.statSync(nameFile);
  return isItFile.isFile();
}; // OBTENER SÓLO LOS ARCHIVOS CON EXTENSIÓN .MD


exports.functionFilePathExists = functionFilePathExists;

const functionIsFileMd = file => {
  const extName = pathModule.extname(file) === '.md';
  return extName;
}; // LEE SINCRONA TODO EL CONTENIDO  DE UN ARCHIVO


exports.functionIsFileMd = functionIsFileMd;

const functionReadFileS = file => {
  let data = fs.readFileSync(file, 'utf8');
  console.log(data);
  return data;
}; //  RECORRE TODO LOS ARCHIVOS CON EXT .MD  DE LA CARPETA Y LO GUARDA EN ARRAY


exports.functionReadFileS = functionReadFileS;

const functionReadAllFiles = route => {
  let array = [];

  if (functionFilePathExists(route)) {
    if (functionIsFileMd(route)) {
      array.push(route);
    }
  } else {
    let dir = fs.readdirSync(route);
    dir.forEach(file => {
      let arrayNew = functionReadAllFiles(pathModule.join(route, file));
      array = array.concat(arrayNew);
    });
  }

  return array;
};

exports.functionReadAllFiles = functionReadAllFiles;