// Contiene utilidads para la manipulación y trasnformacion de arhivos
const fs = require('fs');
const path = require('path');

// export const filePathExists = (nameFile) => {
//   fsModule.stat(nameFile, (err, data)=> {
//     if (err) 
//       console.log('no existe' + err);
//     else 
//     console.log(data);
//     console.log(data.isFile()); 
//   });
// }


// // VERIFICAR SI SON ARCHIVOS
// export const  filePathExists=(filePath)=> {
//   return new Promise((resolve, reject) => {
//     fs.stat(filePath, (err, stats) => {
//       if (stats.isFile()){
//         console.log(true);
//         return resolve(true);
//       } else {
//         console.log(err);
//         return reject(false);
//       } 
//     });
//   });
// };

// filePathExists('prueba\\archivo.md') 

// OBTENER SÓLO LOS ARCHIVOS CON EXTENSIÓN .MD
export const isFileMd = file => {
  return path.extname(file);
};

