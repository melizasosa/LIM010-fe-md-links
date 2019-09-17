import {functionTypePath} from '../src/path.js';
import {isFileMd} from '../src/file.js';
import path from 'path';

describe('Test de la función convertir ruta relativa', () => {
  it('Debería ser una función', () => {
  	expect(typeof functionTypePath).toBe('function');
	});	
  it('Debería convertir una ruta relativa a absoluta', () => {
    expect(functionTypePath('prueba/archivo.md')).toBe(path.join(process.cwd(),'prueba\\archivo.md'));
  });
  it('Debería retornar una ruta absoluta', () => {
    //let pathAbsolute = path.join(process.cwd(), 'prueba\\archivo.md');
    expect(functionTypePath(path.join(process.cwd(),'prueba\\archivo.md'))).toBe(path.join(process.cwd(),'prueba\\archivo.md'));
	});
});

// describe('Permite verificar si es un archivo', () => {
//   it('Debería ser una función', () => {
//   	expect(typeof filePathExists).toBe('function');
// 	});	
//   it('Debería ser true para una ruta que sea de archivo', () => {
//     return filePathExists('prueba\\archivo.md').then(result => {
//       expect(result).toBe(false)
//     });
//   });
//   it('Debería ser false para una ruta que no sea de archivo', () => {
//     return filePathExists('prueba\\archivoo.md').c(result => {
//       expect(result).toBe(true)
//     });
//   });
// });

describe('Permite conocer la extension del archivo', () => {
  it('Debería ser una función', () => {
  	expect(typeof isFileMd).toBe('function');
	});	
  it('Tipo de archivo', () => {
    expect(isFileMd('prueba/archivo.md')).toBe('.md');
  });
});
