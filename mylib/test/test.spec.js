import {functionTypePath} from '../src/path.js';
import {filePathExists} from '../src/file.js';
describe('Test de la función convertir ruta relativa', () => {
  it('Debería ser una función', () => {
  	expect(typeof functionTypePath).toBe('function');
	});	
  it('Debería convertir una ruta relativa a absoluta', () => {
    expect(functionTypePath('prueba/archivo.md')).toBe('C:\\Users\\L-67\\Desktop\\Proyecto-Links\\LIM010-fe-md-links\\prueba\\archivo.md');
  });
  it('Debería retornar una ruta absoluta', () => {
    expect(functionTypePath('C:\\Users\\L-67\\Desktop\\Proyecto-Links\\LIM010-fe-md-links\\prueba\\archivo.md')).toBe('C:\\Users\\L-67\\Desktop\\Proyecto-Links\\LIM010-fe-md-links\\prueba\\archivo.md');
	});
});

describe('Permite verificar si es un archivo', () => {
  it('Debería ser una función', () => {
  	expect(typeof filePathExists).toBe('function');
	});	
  it('Debería ser true para una ruta que sea de archivo', () => {
    return filePathExists('prueba\\archivo.md').then(result => {
      expect(result).toBe(true)
    });
  });
  it('Debería ser false para una ruta que no sea de archivo', () => {
    return filePathExists('prueba\\archivoo.md').then(result => {
      expect(result).toBe(false)
    });
  });
});
