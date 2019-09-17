import { functionTypePath } from '../src/path';
import { filePathExists,isFileMd } from '../src/file.js';
import path from 'path';

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
  	expect(typeof filePathExists).toBe('function');
	});	
  it('Debería ser true para una ruta que sea de archivo', () => {
    expect(filePathExists(path.join(process.cwd(),'prueba\\archivo.md'))).toBe(true)
    });
  it('Debería ser false para una ruta que no sea de archivo', () => {
    expect(filePathExists(path.join(process.cwd(), 'fakePath')).toBe(false))
    });
  });


describe('Permite conocer la extension del archivo', () => {
  it('Debería ser una función', () => {
  	expect(typeof isFileMd).toBe('function');
	});	
  it('Tipo de archivo', () => {
    expect(isFileMd(path.join(process.cwd(),'prueba/archivo.md'))).toBe('.md');
  });
});

describe('Permite leer el contenido del archivo', () => {
  it('Debería ser una función', () => {
  	expect(typeof isFileMd).toBe('function');
	});	
  it('Debería leer el contenido del archivo', () => {
    expect(readFileA(path.join(process.cwd(),'prueba/archivo.md')).toBe('hola');
  });
});