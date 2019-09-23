// import { functionValidateLinks, functionExtractedLinkFile } from './index.js';
const pathModule = require('path');
const { functionValidateLinks } = require('../src/index.js');
const { functionExtractedLinkFile } = require('../src/index.js');
// eslint-disable-next-line no-undef
export const mdLinks = (path, options) => new promise((resolve) => {
  if (options.validate === true) {
    resolve(functionValidateLinks(path));
  } else {
    resolve(functionExtractedLinkFile(path));
  }
});

mdLinks(pathModule.join(process.cwd(), 'prueba\\archivo.md'), { validate: true }).then((val) => console.log(val));
