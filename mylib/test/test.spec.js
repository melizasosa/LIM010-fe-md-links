import {functionTypePath, functionVerifyFile} from '../src/path.js';
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

describe('Test de la función verificar si es un archivo', () => {
  it('Debería ser una función', () => {
  	expect(typeof functionVerifyFile).toBe('function');
	});	
  it('Debería retornar un booleano (si es un archivo debe ser TRUE)', () => {
    expect(functionVerifyFile('archivo.md')).toBe(true);
  });
  it('DDebería retornar un booleano, si es un archivo debe ser FALSE', () => {
    expect(functionTypePath('prueba/archivo.md')).toBe(false);
	});
});

