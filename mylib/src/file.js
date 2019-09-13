// Contiene utilidads para la manipulación y trasnformacion de arhivos
const fsModule = require('fs');

const nameFile = 'archivo.md';
// export const functionVerifyFile = (nameFile) => {
//   // const fileStats = fs.statSync(nameFile);
// 	// console.log(fileStats.);
// 	fs.sta
// };
fsModule.stat(nameFile, (err, data)=> {
  if (err) 
    console.log('it does not exist');
  else 
    console.log('it exists');
});
console.log(fsModule.stat());