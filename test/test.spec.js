import path from 'path';
import {
  functionTypePath, functionFilePathExists, functionIsFileMd, functionReadFileS,
  functionReadAllFiles, functionExtractedLinkFile, functionValidateLinks,
} from '../src/index.js';


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

describe('Permite validar el link que se encuentra en la ruta', () => {
  it('deberia ser una funcion', () => {
    expect(typeof functionValidateLinks).toBe('function');
  });
});

describe('Permite validar el link que se encuentra en la ruta ingresada', (done) => {
  it('Debería vevolvernos una promesa', () => functionValidateLinks(path.join(process.cwd(), 'prueba'))
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
