const fs = require('fs');

// LEE SINCRONA TODO EL CONTENIDO  DE UN ARCHIVO
const readFileS = (file) => {
  const data = fs.readFileSync(file, 'utf8');
  return data;
};
readFileS('prueba\\archivo.md');
