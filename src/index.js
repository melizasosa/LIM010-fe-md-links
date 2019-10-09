// Contiene utilidads para la manipulación y trasnformacion de arhivos
const fsModule = require('fs');
const pathModule = require('path');
const marked = require('marked');
const fetch = require('node-fetch');
const colors = require('colors/safe');


const functionTypePath = (filePath) => {
  if (!pathModule.isAbsolute(filePath)) {
    return pathModule.resolve(filePath);
  }
  return filePath;
};

// FUNCIÓN PARA VERIFICAR SI ES UNA RUTA
const functionVeriedPath = (filePath) => {
  const isItPath = fsModule.existsSync(filePath);
  return isItPath;
};

// VERIFICAR SI ES ARCHIVO
const functionFilePathExists = (nameFile) => {
  const isItFile = fsModule.statSync(nameFile);
  return isItFile.isFile();
};

// OBTENER SÓLO LOS ARCHIVOS CON EXTENSIÓN .MD
const functionIsFileMd = (path) => {
  const extName = pathModule.extname(path) === '.md';
  return extName;
};

// LEE SINCRONA TODO EL CONTENIDO  DE UN ARCHIVO
const functionReadFileS = (path) => {
  const data = fsModule.readFileSync(path, 'utf8');
  return data;
};

//  RECORRE TODO LOS ARCHIVOS CON EXT .MD  DE LA CARPETA Y LO GUARDA EN ARRAY
const functionReadAllFiles = (path) => {
  let arrayFileMd = [];
  if (functionFilePathExists(path)) {
    if (functionIsFileMd(path)) {
      arrayFileMd.push(path);
    }
  } else {
    const directory = fsModule.readdirSync(path);
    directory.forEach((file) => {
      const arrayPath = functionReadAllFiles(pathModule.join(path, file));
      arrayFileMd = arrayFileMd.concat(arrayPath);
    });
  }
  return arrayFileMd;
};

// RECORRER Y LEER LOS LINKS DE ARCHIVOS .MD
const functionExtractedLinkFile = (path) => {
  const arrLinks = [];
  const arrayFile = functionReadAllFiles(functionTypePath(path));
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

// VALIDAR SI EL LINK ES VALIDO O NO
const functionValidateLinks = (path) => {
  const arrayObj = functionExtractedLinkFile(path);
  const urlFileMd = arrayObj.map((elemento) => new Promise((resolve) => {
    fetch(elemento.href).then((val) => {
      const dat = { ...elemento };
      if (val.status > 199 && val.status < 400) {
        dat.status = val.status;
        dat.statusText = val.statusText;
        resolve(dat);
      } else {
        dat.status = val.status;
        dat.statusText = 'Fail';
        resolve(dat);
      }
    }).catch(() => {
      const dat = { ...elemento };
      dat.status = 'Fail';
      dat.statusText = 'Not Exist';
      resolve(dat);
    });
  }));
  return Promise.all(urlFileMd);
};

// FUNCIÓN DE MDLINKS
const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (functionVeriedPath(path)) {
    if (options && options.validate) {
      resolve((functionValidateLinks(path)));
    } else {
      resolve(functionExtractedLinkFile(path));
    }
  } else {
    reject(new Error('Ruta incorrecta'));
  }
});

// FUNCIÓN DE STATS
const functionStats = (arrayLinks) => {
  // const arrayLinks = functionExtractedLinkFile(path);
  const totalElementosArray = arrayLinks.map((elemento) => elemento.href);
  const sinRepetidos = totalElementosArray.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
  const stats = `Total:${totalElementosArray.length} Unique: ${sinRepetidos.length}`;
  return stats;
};


// FUNCIÓN OPCIÓN --VALIDATE --V
const functionValidate = (arrayLinks) => {
  const totalElementosArray = arrayLinks.map((elemento) => `${elemento.filepath} ${elemento.href} ${elemento.statusText} ${elemento.status} ${elemento.text}`);
  return totalElementosArray.join('\n');
};

// FUNCIÓN OPCION --VALIDATE --STATS
const functionStatsAndValidate = (arraLyinks) => {
  const totalElementosLinks = arraLyinks.map((elemento) => elemento.href);
  const linksUnique = totalElementosLinks.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
  const totalElementosBroken = arraLyinks.filter((val) => val.statusText === 'Fail' || val.statusText === 'Not Found' || val.statusText === 'Not Exist');
  const statsValidate = `Total:${totalElementosLinks.length} Unique: ${linksUnique.length} Broken:${totalElementosBroken.length}`;
  return statsValidate;
};

// FUNCIÓN OPCION --VALIDATE --STATS
const functionOnlyPath = (arrayLinks) => {
  const totalElementosArray = arrayLinks.map((elemento) => `${elemento.filepath} ${elemento.href} ${elemento.text}`);
  return totalElementosArray.join('\n');
};

module.exports = {
  functionTypePath,
  functionVeriedPath,
  functionFilePathExists,
  functionIsFileMd,
  functionReadFileS,
  functionReadAllFiles,
  functionExtractedLinkFile,
  functionValidateLinks,
  mdLinks,
  functionStats,
  functionValidate,
  functionOnlyPath,
};
