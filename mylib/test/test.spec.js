import {functionTypePath} from '../src/path.js';
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

