"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.functionTypePath = void 0;

// Contiene utilidads para la manipulación y trasnformacion de rutas de los archivos
const pathRoute = require('path');

const functionTypePath = inputPath => {
  if (!pathRoute.isAbsolute(inputPath)) {
    return pathRoute.resolve(inputPath);
  }

  return inputPath;
};

exports.functionTypePath = functionTypePath;