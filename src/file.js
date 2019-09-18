// Contiene utilidads para la manipulación y trasnformacion de arhivos
const fs = require('fs');
const pathModule = require('path');

// VERIFICAR SI ES ARCHIVO
export const filePathExists = (nameFile) => {
  const isItFile = fs.statSync(nameFile);
  return isItFile.isFile();
};

// OBTENER SÓLO LOS ARCHIVOS CON EXTENSIÓN .MD
export const isFileMd = (file) => pathModule.extname(file);
