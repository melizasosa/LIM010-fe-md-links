import path from 'path';
import {
  functionTypePath, functionFilePathExists, functionIsFileMd, functionReadFileS,
  functionReadAllFiles, functionExtractedLinkFile, functionValidateLinks, mdLinks,
  functionStats, functionValidate, functionMdLinksCli,
} from '../src/index.js';

// eslint-disable-next-line import/named
// import { functionMdLinksCli } from '../src/cli.js';

const arrayOutput = [
  'C:\\Users\\L-67\\Desktop\\Proyecto-Links\\LIM010-fe-md-links\\prueba\\archivo.md https://aws.amazon.com/es/ 200 Netflix',
  'C:\\Users\\L-67\\Desktop\\Proyecto-Links\\LIM010-fe-md-links\\prueba\\archivo.md https://www.google.com/searc 404 Google',
];

const arrayInput = [{
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
}];

describe('TPermite convertir ruta relativa', () => {
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
    expect(functionIsFileMd(path.join(process.cwd(), 'prueba/archivo.md'))).toBe(true);
  });
});

describe('Permite leer el contenido del archivo', () => {
  it('Debería ser una función', () => {
    expect(typeof functionReadFileS).toBe('function');
  });
  it('Debería leer el contenido del archivo', () => {
    expect(functionReadFileS(path.join(process.cwd(), 'prueba/archivo.md'))).toEqual('Amazon [Netflix](https://aws.amazon.com/es/) Bienvenido a google. [Google](https://www.google.com/searc)');
  });
});

describe('Permite recorrer los archivos del directorio', () => {
  it('Debería ser una función', () => {
    expect(typeof functionReadAllFiles).toBe('function');
  });
  it('Debería leer el directorio y retornar un array con archivos .md', () => {
    expect(functionReadAllFiles(path.join(process.cwd(), 'prueba'))).toEqual([path.join(process.cwd(), 'prueba\\archivo.md'), path.join(process.cwd(), 'prueba\\archivo3.md'), path.join(process.cwd(), 'prueba\\prueba2\\archivo2.md')]);
  });
});

describe('Permite obtiener los links de las rutas absolutas .md', () => {
  it('Debería ser una función', () => {
    expect(typeof functionExtractedLinkFile).toBe('function');
  });
  it('Debería retornar un array con objetos de los links', () => {
    expect(functionExtractedLinkFile(path.join(process.cwd(), 'prueba'))).toEqual(
      [{
        href: 'https://aws.amazon.com/es/',
        text: 'Netflix',
        filepath: path.join(process.cwd(), 'prueba\\archivo.md'),
      },
      {
        href: 'https://www.google.com/searc',
        text: 'Google',
        filepath: path.join(process.cwd(), 'prueba\\archivo.md'),
      }],
    );
  });
});

describe('Permite validar el link que se encuentra en la ruta ingresada', () => {
  it('Debería vevolvernos una promesa', (done) => functionValidateLinks(path.join(process.cwd(), 'prueba'))
    .then((data) => {
      expect(data).toStrictEqual([{
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
      }]);
      done();
    }));
});
// // eslint-disable-next-line jest/no-identical-title
describe('Permite devolver un array con objetos de la ruta ingresada', () => {
  it('Debería vevolvernos una promesa con validacion del link', (done) => mdLinks(path.join(process.cwd(), 'prueba'), { validate: true })
    .then((data) => {
      expect(data).toStrictEqual([{
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
      }]);
      done();
    }));
  // eslint-disable-next-line jest/no-identical-title
  it('Debería vevolvernos una promesa sin la validacion del link', (done) => mdLinks(path.join(process.cwd(), 'prueba'))
    .then((data) => {
      expect(data).toStrictEqual([{
        href: 'https://aws.amazon.com/es/',
        text: 'Netflix',
        filepath: path.join(process.cwd(), 'prueba\\archivo.md'),
      },
      {
        href: 'https://www.google.com/searc',
        text: 'Google',
        filepath: path.join(process.cwd(), 'prueba\\archivo.md'),
      }]);
      done();
    }));
  it('deberia retornar un mensaje de error', () => mdLinks(path.join(process.cwd(), 'pruebaa'), { validate: true })
    .catch((data) => {
      // eslint-disable-next-line no-param-reassign
      expect(data.code === 'ENOENT').toEqual(false);
    }));
});

// eslint-disable-next-line jest/no-identical-title
describe('Permite devolver un string del total y unique', () => {
  it('Debería retornar un string', () => {
    // eslint-disable-next-line jest/valid-expect
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
    // eslint-disable-next-line jest/valid-expect
    expect(functionValidate(arrayInput)).toStrictEqual(arrayOutput);
  });
});

// eslint-disable-next-line jest/no-identical-title
describe('Permite devolver un array con objetos de la ruta ingresada', () => {
  it('Debería vevolvernos una promesa conn string', (done) => functionMdLinksCli('prueba', '--v', '--s')
    .then((data) => {
      expect(data).toBe('Total:2 Unique: 2 Broken: 0');
      done();
    }));
  it('Debería vevolvernos una con 3 estadisticas', (done) => functionMdLinksCli('prueba', '--v')
    .then((data) => {
      expect(data).toStrictEqual(arrayOutput);
      done();
    }));
  it('Debería vevolvernos una con 2 estadisticas', (done) => functionMdLinksCli('prueba', '--stats')
    .then((data) => {
      expect(data).toStrictEqual('Total:2 Unique: 2');
      done();
    }));
  // eslint-disable-next-line jest/no-identical-title
  it('Debería vevolvernos una con 2 estadisticas', (done) => functionMdLinksCli('prueba', '--s')
    .then((data) => {
      expect(data).toStrictEqual('Total:2 Unique: 2');
      done();
    }));
});
