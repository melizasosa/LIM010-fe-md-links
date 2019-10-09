import {functionStatsAndValidate, functionValidate, functionStats, functionOnlyPath} from './index.js';

// FUNCIÓN PARA LAS OPCIONES CON EL CLI
const functionMdLinksCli = (path, firtsOption, segundOption) => {
    let result;
    if ((path !== undefined) && (firtsOption === '--validate' || firtsOption === '--v') && (segundOption === '--stats' || segundOption === '--s')) {
      result = mdLinks(path, { validate: true }).then((res) => functionStatsAndValidate(res));
    } else if ((path !== undefined) && (firtsOption === '--validate' || firtsOption === '--v')) {
      result = mdLinks(path, { validate: true }).then((res) => functionValidate(res));
    } else if ((path !== undefined) && (firtsOption === '--stats' || firtsOption === '--s')) {
      result = mdLinks(path, { validate: true }).then((res) => functionStats(res));
    } else if ((path !== undefined) && (firtsOption === undefined) && (segundOption === undefined)) {
      result = mdLinks(path, { validate: false }).then((res) => functionOnlyPath(res));
    } else {
      result = mdLinks(path, { validate: false }).then(() => 'Ruta no existe');
    }
    return result;
  };

module.exports = functionMdLinksCli;