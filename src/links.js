const fs = require('fs');

// LEE ASINCRONICAMENTE TODO EL CONTENIDO  DE UN ARCHIVO
const readFileA = (file) => {
  fs.readFile(file, 'utf8', (error, data)=>{
    if(error){
      console.log(`error ${error}`);
    } else {
      console.log(data);
      }
  });
}
readFileA('prueba\\archivo.md') ;
