import path from 'path';
import {
  functionTypePath, functionFilePathExists, functionIsFileMd, functionReadFileS,
  functionReadAllFiles, functionExtractedLinkFile, functionValidateLinks, mdLinks,
  functionStats, functionValidate, functionMdLinksCli,
} from '../src/index.js';

// eslint-disable-next-line import/named
// import { functionMdLinksCli } from '../src/cli.js';
const arrayFileMd = ['prueba\\archivo.md', 'prueba\\archivo3.md', 'prueba\\prueba2\\archivo2.md'];

const arrayOutput = [
  'C:\\Users\\L-67\\Desktop\\Proyecto-Links\\LIM010-fe-md-links\\prueba\\archivo.md https://aws.amazon.com/es/ OK 200 Netflix',
  'C:\\Users\\L-67\\Desktop\\Proyecto-Links\\LIM010-fe-md-links\\prueba\\archivo.md https://www.googleee.com Not Exist Fail Google',
];

const arrayUnvalided = [{
  href: 'https://aws.amazon.com/es/',
  text: 'Netflix',
  filepath: path.join(process.cwd(), 'prueba\\archivo.md'),
},
{
  href: 'https://www.googleee.com',
  text: 'Google',
  filepath: path.join(process.cwd(), 'prueba\\archivo.md'),
}];

const arrayLinks = [{
  href: 'https://aws.amazon.com/es/',
  text: 'Netflix',
  filepath: path.join(process.cwd(), 'prueba\\archivo.md'),
  status: 200,
  statusText: 'OK',
},
{
  href: 'https://www.googleee.com',
  text: 'Google',
  filepath: path.join(process.cwd(), 'prueba\\archivo.md'),
  status: 'Fail',
  statusText: 'Not Exist',
}];

const arrayLinksString = [{
  href: 'https://aws.amazon.com/es/',
  text: 'Netflix',
  filepath: 'C:\\Users\\L-67\\Desktop\\Proyecto-Links\\LIM010-fe-md-links\\prueba\\archivo.md',
  status: 200,
  statusText: 'OK',
},
{
  href: 'https://www.googleee.com',
  text: 'Google',
  filepath: 'C:\\Users\\L-67\\Desktop\\Proyecto-Links\\LIM010-fe-md-links\\prueba\\archivo.md',
  status: 'Fail',
  statusText: 'Not Exist',
}];

const resultVS = 'Total:2 Unique: 2 Broken:1';
const resultValidate = ['F:\\libreria-mdLinks\\LIM010-fe-md-links\\prueba\\archivo.md https://aws.amazon.com/es/ OK 200 Netflix', 'F:\\libreria-mdLinks\\LIM010-fe-md-links\\prueba\\archivo.md https://www.googleee.com Not Exist Fail Google'];
const resultStats = 'Total:2 Unique: 2';
const resultPath = ['F:\\libreria-mdLinks\\LIM010-fe-md-links\\prueba\\archivo.md https://aws.amazon.com/es/ Netflix', 'F:\\libreria-mdLinks\\LIM010-fe-md-links\\prueba\\archivo.md https://www.googleee.com Google'];
const arrayLinksUnvalide = [{
  href: 'https://www.googleee.com',
  status: 'Fail',
  statusText: 'Not Exist',
  text: 'Google',
  filepath: path.join(process.cwd(), 'prueba\\archivo.md'),
}];
const arrayFail = [{
  href: 'https://www.googleee.com',
  text: 'Google',
  filepath: path.join(process.cwd(), 'prueba\\archivo.md'),
  status: 'Fail',
  statusText: 'Not Exist',
}];

describe('Permite convertir ruta relativa', () => {
  it('Debería ser una función', () => {
    expect(typeof functionTypePath).toBe('function');
  });
  it('Debería convertir una ruta relativa a absoluta', () => {
    expect(functionTypePath('prueba/archivo.md')).toBe(path.join(process.cwd(), 'prueba\\archivo.md'));
  });
  it('Debería retornar una ruta absoluta', () => {
    expect(functionTypePath(path.join(process.cwd(), 'prueba\\archivo.md'))).toBe(path.join(process.cwd(), 'prueba\\archivo.md'));
  });
});

describe('Permite verificar si es un archivo', () => {
  it('Debería ser una función', () => {
    expect(typeof functionFilePathExists).toBe('function');
  });
  it('Debería ser true para una ruta que sea de archivo', () => {
    expect(functionFilePathExists(path.join(process.cwd(), 'prueba\\archivo.md'))).toBe(true);
  });
  it('Debería ser false para una ruta que no sea de archivo', () => {
    expect(functionFilePathExists(path.join(process.cwd(), 'prueba'))).toBe(false);
  });
});

describe('Permite conocer si es markdown', () => {
  it('Debería ser una función', () => {
    expect(typeof functionIsFileMd).toBe('function');
  });
  it('deberia retornar true si es markdow', () => {
    expect(functionIsFileMd('prueba/archivo.md')).toBe(true);
  });
});

describe('Permite leer el contenido del archivo', () => {
  it('Debería ser una función', () => {
    expect(typeof functionReadFileS).toBe('function');
  });
  it('Debería leer el contenido del archivo', () => {
    expect(functionReadFileS(path.join(process.cwd(), 'prueba/archivo.md'))).toEqual('[Netflix](https://aws.amazon.com/es/) Bienvenido a google.[Google](https://www.googleee.com)');
  });
});

describe('Permite recorrer los archivos del directorio', () => {
  it('Debería ser una función', () => {
    expect(typeof functionReadAllFiles).toBe('function');
  });
  it('Debería leer el directorio y retornar un array con archivos .md', () => {
    expect(functionReadAllFiles('prueba')).toEqual(arrayFileMd);
  });
});

describe('Permite obtiener los links del archivo .md', () => {
  it('Debería ser una función', () => {
    expect(typeof functionExtractedLinkFile).toBe('function');
  });
  it('Debería retornar un array con objetos de los links', () => {
    expect(functionExtractedLinkFile(path.join(process.cwd(), 'prueba\\archivo.md'))).toEqual(arrayUnvalided);
  });
});

describe('Permite validar el link que se encuentra en la ruta ingresada', () => {
  it('Debería vevolvernos una promesa', (done) => functionValidateLinks(path.join(process.cwd(), 'prueba\\archivo.md'))
    .then((data) => {
      expect(data).toStrictEqual(arrayLinks);
      done();
    }));
  it('Debería devolvernos si los links no son validos', (done) => functionValidateLinks(arrayLinksUnvalide)
    .then((data) => {
      expect(data).toStrictEqual(arrayFail);
      done();
    }));
});

describe('Permite devolver un array con objetos de la ruta ingresada', () => {
  it('Debería devolvernos una promesa con validacion del link', (done) => mdLinks(path.join(process.cwd(), 'prueba\\archivo.md'), { validate: true })
    .then((data) => {
      expect(data).toStrictEqual(arrayLinks);
      done();
    }));
  it('Debería devolvernos una promesa sin la validacion del link', (done) => mdLinks(path.join(process.cwd(), 'prueba\\archivo.md'))
    .then((data) => {
      expect(data).toStrictEqual(arrayUnvalided);
      done();
    }));
  it('Debería devolvernos un mensaje indicando que ingrese una ruta', (done) => mdLinks('p')
    .catch((error) => {
      expect(error.message).toBe('Ingresar Ruta');
      done();
    }));
});

describe('Permite devolver un string del total y unique', () => {
  it('Debería retornar un string', () => {
    expect(functionStats([{
      href: 'https://aws.amazon.com/es/',
      text: 'Netflix',
      filepath: path.join(process.cwd(), 'prueba\\archivo.md'),
      status: 200,
      statusText: 'OK',
    },
    {
      href: 'https://www.google.com/searc',
      text: 'Google',
      filepath: path.join(process.cwd(), 'prueba\\archivo.md'),
      status: 404,
      statusText: 'Not Found',
    }])).toBe('Total:2 Unique: 2');
  });
});

describe('Permite devolver un string de todo los elementos del array', () => {
  it('Debería retornar un string de los links', () => {
    expect(functionValidate(arrayLinksString)).toStrictEqual(arrayOutput);
  });
});

// eslint-disable-next-line jest/no-identical-title
describe('Permite devolver los resultados', () => {
  it('Deberia devolver total, unique y broque del archivo en consola', (done) => {
    functionMdLinksCli(path.join(process.cwd(), 'prueba'), '--validate', '--stats').then((result) => {
      expect(result).toBe(resultVS);
      done();
    });
  });

  it('Deberia devolver file, href y text, status, statusText del archivo en consola', (done) => {
    functionMdLinksCli('C:\\Users\\L-67\\Desktop\\Proyecto-Links\\LIM010-fe-md-links\\prueba\\archivo.md', '--validate').then((result) => {
      expect(result).toBe(resultValidate);
      done();
    });
  });

  it('Deberia devolver total y unique del archivo en consola', (done) => {
    functionMdLinksCli(path.join(process.cwd(), 'prueba'), '--stats').then((result) => {
      expect(result).toStrictEqual(resultStats);
      done();
    });
  });
});
