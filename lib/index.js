"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.functionReadLinkFile = exports.functionReadAllFiles = exports.functionReadFileS = exports.functionIsFileMd = exports.functionFilePathExists = exports.functionTypePath = void 0;

// Contiene utilidads para la manipulación y trasnformacion de arhivos
const fsModule = require('fs');

const pathModule = require('path');

const marked = require('marked');

const functionTypePath = filePath => {
  if (!pathModule.isAbsolute(filePath)) {
    return pathModule.resolve(filePath);
  }

  return filePath;
}; // VERIFICAR SI ES ARCHIVO


exports.functionTypePath = functionTypePath;

const functionFilePathExists = nameFile => {
  const isItFile = fsModule.statSync(nameFile);
  return isItFile.isFile();
}; // OBTENER SÓLO LOS ARCHIVOS CON EXTENSIÓN .MD


exports.functionFilePathExists = functionFilePathExists;

const functionIsFileMd = file => {
  const extName = pathModule.extname(file) === '.md';
  return extName;
}; // LEE SINCRONA TODO EL CONTENIDO  DE UN ARCHIVO


exports.functionIsFileMd = functionIsFileMd;

const functionReadFileS = file => {
  const data = fsModule.readFileSync(file, 'utf8');
  return data;
}; //  RECORRE TODO LOS ARCHIVOS CON EXT .MD  DE LA CARPETA Y LO GUARDA EN ARRAY


exports.functionReadFileS = functionReadFileS;

const functionReadAllFiles = route => {
  let arrayFileMd = [];

  if (functionFilePathExists(route)) {
    if (functionIsFileMd(route)) {
      arrayFileMd.push(route);
    }
  } else {
    const directory = fsModule.readdirSync(route);
    directory.forEach(file => {
      const arrayPath = functionReadAllFiles(pathModule.join(route, file));
      arrayFileMd = arrayFileMd.concat(arrayPath);
    });
  }

  return arrayFileMd;
}; // console.log(functionReadAllFiles('prueba'));
// RECORRER Y LEER LOS LINKS DE ARCHIVOS .MD


exports.functionReadAllFiles = functionReadAllFiles;

const functionReadLinkFile = arrayFileMd => {
  const arrObj = [];
  const arrayFile = functionReadAllFiles(functionTypePath(arrayFileMd));
  arrayFile.forEach(filePath => {
    let linksFileMd = functionReadFileS(filePath);
    const renderer = new marked.Renderer();

    renderer.link = (href, title, text) => {
      arrObj.push({
        href: href,
        text: text,
        filepath: filePath
      });
      return renderer;
    };

    marked(filePath, {
      renderer: renderer
    });
  }); // eslint-disable-next-line no-undef

  return arrObj;
}; // const md = 'this is some example markdown with [a link](github.com).';


exports.functionReadLinkFile = functionReadLinkFile;
console.log(functionReadLinkFile('C:/Users/L-67/Desktop/Proyecto-Links/LIM-010-fe-md-links/prueba'));