"use strict";

// Contiene utilidads para la manipulación y trasnformacion de arhivos
const fsModule = require('fs');

const pathModule = require('path');

const marked = require('marked');

const fetch = require('node-fetch');

const functionTypePath = filePath => {
  if (!pathModule.isAbsolute(filePath)) {
    return pathModule.resolve(filePath);
  }

  return filePath;
}; // console.log(functionTypePath(pathModule.join(process.cwd(), 'prueba\\archivo.md')));
// VERIFICAR SI ES ARCHIVO


const functionFilePathExists = nameFile => {
  const isItFile = fsModule.statSync(nameFile);
  return isItFile.isFile();
}; // OBTENER SÓLO LOS ARCHIVOS CON EXTENSIÓN .MD


const functionIsFileMd = path => {
  const extName = pathModule.extname(path) === '.md';
  return extName;
}; // LEE SINCRONA TODO EL CONTENIDO  DE UN ARCHIVO


const functionReadFileS = path => {
  const data = fsModule.readFileSync(path, 'utf8');
  return data;
}; //  RECORRE TODO LOS ARCHIVOS CON EXT .MD  DE LA CARPETA Y LO GUARDA EN ARRAY


const functionReadAllFiles = path => {
  let arrayFileMd = [];

  if (functionFilePathExists(path)) {
    if (functionIsFileMd(path)) {
      arrayFileMd.push(path);
    }
  } else {
    const directory = fsModule.readdirSync(path);
    directory.forEach(file => {
      const arrayPath = functionReadAllFiles(pathModule.join(path, file));
      arrayFileMd = arrayFileMd.concat(arrayPath);
    });
  }

  return arrayFileMd;
}; // console.log(functionReadAllFiles('prueba'));
// RECORRER Y LEER LOS LINKS DE ARCHIVOS .MD


const functionExtractedLinkFile = path => {
  const arrLinks = [];
  const arrayFile = functionReadAllFiles(functionTypePath(path));
  arrayFile.forEach(filePath => {
    const linksFileMd = functionReadFileS(filePath);
    const renderer = new marked.Renderer();

    renderer.link = (url, title, urlText) => {
      arrLinks.push({
        href: url,
        text: urlText,
        filepath: filePath
      });
    };

    marked(linksFileMd, {
      renderer
    });
  });
  return arrLinks;
}; // VALIDAR SI EL LINK ES VALIDO O NO


const functionValidateLinks = path => {
  const arrayObj = functionExtractedLinkFile(path);
  const urlFileMd = arrayObj.map(elemento => new Promise(resolve => fetch(elemento.href).then(val => {
    if (val.status > 199 && val.status < 400) {
      elemento.status = val.status;
      elemento.statusText = val.statusText;
      resolve(elemento);
    } else {
      elemento.status = val.status;
      elemento.statusText = val.statusText;
      resolve(elemento);
    }
  })));
  return Promise.all(urlFileMd);
}; // FUNCIÓN DE MDLINKS


const mdLinks = (path, options) => new Promise((resolve, reject) => {
  try {
    if (options) {
      resolve(functionValidateLinks(path));
    } else {
      resolve(functionExtractedLinkFile(path));
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      const tipoError = 'Ruta incorrecta';
      reject(tipoError);
    }
  }
});

mdLinks(pathModule.join(process.cwd(), 'pruebaarchivo5.md'), {
  validate: true
}).then(val => console.log(val));
module.exports = {
  functionTypePath,
  functionFilePathExists,
  functionIsFileMd,
  functionReadFileS,
  functionReadAllFiles,
  functionExtractedLinkFile,
  functionValidateLinks,
  mdLinks
};