import { functionTypePath, functionFilePathExists,functionIsFileMd, functionReadFileS,functionReadAllFiles  } from '../src/index.js';
import path from 'path';
import { functionReadLinkFile } from '../index.js';


describe('Test de la función convertir ruta relativa', () => {
  it('Debería ser una función', () => {
    expect(typeof functionTypePath).toBe('function');
	});	
  it('Debería convertir una ruta relativa a absoluta', () => {
    expect(functionTypePath('prueba/archivo.md')).toBe(path.join(process.cwd(),'prueba\\archivo.md'));
  });
  it('Debería retornar una ruta absoluta', () => {
    expect(functionTypePath(path.join(process.cwd(),'prueba\\archivo.md'))).toBe(path.join(process.cwd(),'prueba\\archivo.md'));
	});
});

describe('Permite verificar si es un archivo', () => {
  it('Debería ser una función', () => {
  	expect(typeof functionFilePathExists).toBe('function');
	});	
  it('Debería ser true para una ruta que sea de archivo', () => {
    expect(functionFilePathExists(path.join(process.cwd(),'prueba\\archivo.md'))).toBe(true)
    });
  it('Debería ser false para una ruta que no sea de archivo', () => {
    expect(functionFilePathExists(path.join(process.cwd(), 'prueba'))).toBe(false)
    });
  });

describe('Permite conocer si es markdown', () => {
  it('Debería ser una función', () => {
  	expect(typeof functionIsFileMd).toBe('function');
	});	
  it('deberia retornar true si es markdow', () => {
    expect(functionIsFileMd(path.join(process.cwd(),'prueba/archivo.md'))).toBe(true);
  });
});

describe('Permite leer el contenido del archivo', () => {
  it('Debería ser una función', () => {
  	expect(typeof functionReadFileS).toBe('function');
	});	
  it('Debería leer el contenido del archivo', () => {
    expect(functionReadFileS(path.join(process.cwd(),'prueba/archivo.md'))).toBe('hola');
  });
});

describe('Permite recorrer los archivos del directorio', () => {
  it('Debería ser una función', () => {
  	expect(typeof functionReadAllFiles).toBe('function');
	});	
  it('Debería leer el directorio y retornar un array con archivos .md', () => {
    expect(functionReadAllFiles(path.join(process.cwd(),'prueba'))).toEqual([path.join(process.cwd(), 'prueba\\archivo.md'),path.join(process.cwd(),'prueba\\archivo3.md'), path.join(process.cwd(), 'prueba\\prueba2\\archivo2.md')]);
  });
});

describe('Permite obtiener los links de las rutas absolutas .md', () => {
  it('Debería ser una función', () => {
    expect(typeof functionReadLinkFile).toBe('function');
  });

