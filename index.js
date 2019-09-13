// Contiene utilidads para la manipulación y trasnformacion de arhivos
const fsModule = require('fs');

const nameFile = 'C:\\Users\\L-67\\Desktop\\Proyecto-Links\\LIM010-fe-md-links\\prueba\\archivo.md';

fsModule.stat(nameFile, (err, data)=> {
  if (err) 
    console.log('no existe' + err);
  else 
  console.log(data);
  console.log(data.isFile()); 
});
