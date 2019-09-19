// Contiene utilidads para la manipulación y trasnformacion de arhivos
const fsModule = require('fs');
const pathModule = require('path');
const marked = require('marked');

export const functionTypePath = (filePath) => {
  if (!pathModule.isAbsolute(filePath)) {
    return pathModule.resolve(filePath);
  }
  return filePath;
};


// VERIFICAR SI ES ARCHIVO
export const functionFilePathExists = (nameFile) => {
  const isItFile = fsModule.statSync(nameFile);
  return isItFile.isFile();
};

// OBTENER SÓLO LOS ARCHIVOS CON EXTENSIÓN .MD
export const functionIsFileMd = (file) => {
  const extName = pathModule.extname(file) === '.md';
  return extName;
};

// LEE SINCRONA TODO EL CONTENIDO  DE UN ARCHIVO
export const functionReadFileS = (file) => {
  const data = fsModule.readFileSync(file, 'utf8');
  return data;
};

//  RECORRE TODO LOS ARCHIVOS CON EXT .MD  DE LA CARPETA Y LO GUARDA EN ARRAY
export const functionReadAllFiles = (route) => {
  let arrayFileMd = [];
  if (functionFilePathExists(route)) {
    if (functionIsFileMd(route)) {
      arrayFileMd.push(route);
    }
  } else {
    const directory = fsModule.readdirSync(route);
    directory.forEach((file) => {
      const arrayPath = functionReadAllFiles(pathModule.join(route, file));
      arrayFileMd = arrayFileMd.concat(arrayPath);
    });
  }
  return arrayFileMd;
};
// console.log(functionReadAllFiles('prueba'));

// RECORRER Y LEER LOS LINKS DE ARCHIVOS .MD
export const functionReadLinkFile = (arrayFileMd) => {
  const arrLinks = [];
  const arrayFile = functionReadAllFiles(functionTypePath(arrayFileMd));
  arrayFile.forEach((filePath) => {
    const linksFileMd = functionReadFileS(filePath);
    const renderer = new marked.Renderer();
    renderer.link = (url, title, urlText) => {
      arrLinks.push(
        {
          href: url,
          text: urlText,
          filepath: filePath,
        },
      );
    };
    marked(linksFileMd, { renderer });
  });
  return arrLinks;
};

// console.log(functionReadLinkFile(pathModule.join(process.cwd(), 'prueba')));
