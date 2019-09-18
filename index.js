// Contiene utilidads para la manipulación y trasnformacion de arhivos
const fs = require('fs');
const pathModule = require('path');

// CONVERTIR RUTA RELATIVA - ABSOLUTA
export const functionTypePath = (filePath) => {
  if (!pathModule.isAbsolute(filePath)) {
    return pathModule.resolve(filePath);
  }
  return filePath;
};

// VERIFICAR SI ES ARCHIVO
export const functionFilePathExists = (nameFile) => {
  const isItFile = fs.statSync(nameFile);
  return isItFile.isFile();
};

// OBTENER SÓLO LOS ARCHIVOS CON EXTENSIÓN .MD
export const functionIsFileMd = (file) => {
  const extName = pathModule.extname(file) ==='.md';
  return extName;
}

//  RECORRE TODO LOS ARCHIVOS CON EXT .MD  DE LA CARPETA Y LO GUARDA EN ARRAY
export const functionReadAllFiles = (route) => {
  let array = [];  
  if (functionFilePathExists(route)) {
    if (functionIsFileMd(route)) {
      array.push(route);
    }
  } else {
    let dir = fs.readdirSync(route);
    dir.forEach((file) => {
      let arrayNew = functionReadAllFiles(pathModule.join(route, file));
      array = array.concat(arrayNew);
    });     
  }
  return array;  
};

// LEE SINCRONA TODO EL CONTENIDO  DE UN ARCHIVO
export const functionReadFileS = (file) => {
  let data = fs.readFileSync(file, 'utf8');
  console.log(data);
  return data;
};

// RECORRER Y LEER LOS LINKS DE ARCHIVOS .MD
export const functionReadLinkFile = (arrayFileMd) => {
  let arrObj = [];
  let arrayFile = functionReadAllFiles(functionTypePath(arrayFileMd))
  arrayFile.forEach((filePath) => {
    const linksFileMd = functionReadFileS(filePath);

  });
};
