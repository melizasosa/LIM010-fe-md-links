// Contiene utilidads para la manipulación y trasnformacion de rutas de los archivos
const pathRoute = require('path');

export const functionTypePath = (inputPath) => {
  if (!pathRoute.isAbsolute(inputPath)) {
    return pathRoute.resolve(inputPath);
  }
  return inputPath;
};
