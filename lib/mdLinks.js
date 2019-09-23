// const pathModule = require('path');
// // import { Promise } from 'es6-promise';
// import { functionValidateLinks, functionExtractedLinkFile } from './index.js';
// const mdLinks = (path, options) => new Promise((resolve, reject) => {
//   try {
//     if (options) {
//       resolve(functionValidateLinks(path));
//     } else {
//       resolve(functionExtractedLinkFile(path));
//     }
//   } catch (error) {
//     if (error.code === 'ENOENT') {
//       const tipoError = 'Ruta incorrecta';
//       reject(tipoError);
//     }
//   }
// });
// mdLinks(pathModule.join(process.cwd(), 'prueba\\archivo.md'), { validate: true }).then((val) => console.log(val));
"use strict";