const fs = require('fs');

// LEE SINCRONA TODO EL CONTENIDO  DE UN ARCHIVO
const readFileS = (file) => {
  let data = fs.readFileSync(file, 'utf8');
  console.log(data);
  return data;
}
readFileS('prueba\\archivo.md') ;

