# Markdown Links
[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## Diagrama de Flujo
A continuación, se muestra el diagrama de flujo con el algoritmo para la implementación de la solución de md-Links.
![Diagrama de Flujo](https://github.com/melizasosa/LIM010-fe-md-links/blob/master/mylib/img/MdLinks.png?raw=true)

## Documentación Tecnica de la librería
### Instalación de la librería
Podemos instalar directamente desde GitHub con el comando:

- Instalar la libreria via `npm install --mdLinks`

### Guía  de uso
El ejecutable de nuestra aplicación se puede ejecutar de la siguiente manera a través de la terminal:
md-Links <path-to-file> [options]

#### Opciones
La librería te permite realizar diferentes tipos de consulta:
- `path, --validate, --stats`
  Esta consulta te permite ingresar la ruta, la validacion y el status, lo cual nos imprime estadistica de los links como el total de los links, cuantos son únicos y cuántos son rotos.

  Ingresar comando
  ![--validate --stats](https://github.com/melizasosa/LIM010-fe-md-links/blob/master/mylib/img/mdLinksVS.PNG)

  Resultado
  ![--validate --stats](https://github.com/melizasosa/LIM010-fe-md-links/blob/master/mylib/img/mdLinksVSR.PNG)

- `path, --validate`
  Con esta línea de comando te permIte saber sobre los datos estadísticos de los links.
  
  Ingresar comando
  ![--validate](https://github.com/melizasosa/LIM010-fe-md-links/blob/master/mylib/img/mdLinksVS.PNG)

  Resultado
  ![--validate](https://github.com/melizasosa/LIM010-fe-md-links/blob/master/mylib/img/mdLinksVSR.PNG)

- `path, --stats`
  Con esta línea de comando te permite saber sobre los datos estadísticos de los links como el total y si son únicos.
  
  Ingresar comando
  ![--stats](https://github.com/melizasosa/LIM010-fe-md-links/blob/master/mylib/img/mdLinksVS.PNG)

  Resultado
  ![--stats](https://github.com/melizasosa/LIM010-fe-md-links/blob/master/mylib/img/mdLinksVSR.PNG)

- `path`
  Con esta línea de comando te permite saber todo los links sin la validación.
  
  Ingresar comando
  ![--path](https://github.com/melizasosa/LIM010-fe-md-links/blob/master/mylib/img/mdLinksPath.PNG)

  Resultado
  ![--path](https://github.com/melizasosa/LIM010-fe-md-links/blob/master/mylib/img/mdLinksPR.PNG)

- Si no ingresas una ruta ni una opción te muestra un mensaje indicando.
  
  Ingresar comando
  ![sin ruta](https://github.com/melizasosa/LIM010-fe-md-links/blob/master/mylib/img/mdLink.PNG)

  Resultado
  ![sin ruta](https://github.com/melizasosa/LIM010-fe-md-links/blob/master/mylib/img/mdLinksR.PNG)

## Objetivos de aprendizaje

Recuerda colocar en esta seccion los objetivos de aprendizaje que quedaron 
pendientes de tu proyecto anterior.

### Javascript
- [x] Uso de callbacks
- [x] Consumo de Promesas
- [x] Creacion de Promesas
- [x] Modulos de Js
- [x] Recursión

### Node
- [x] Sistema de archivos
- [ ] package.json
- [x] crear modules
- [x] Instalar y usar modules
- [ ] npm scripts
- [ ] CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing
- [x] Testeo de tus funciones
- [x] Testeo asíncrono
- [ ] Uso de librerias de Mock
- [ ] Mocks manuales
- [ ] Testeo para multiples Sistemas Operativos

### Git y Github
- [] Organización en Github

### Buenas prácticas de desarrollo
- [ ] Modularización
- [ ] Nomenclatura / Semántica
- [x] Linting