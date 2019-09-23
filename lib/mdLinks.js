"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = void 0;

// import { functionValidateLinks, functionExtractedLinkFile } from './index.js';
const pathModule = require('path');

const {
  functionValidateLinks
} = require('../src/index.js');

const {
  functionExtractedLinkFile
} = require('../src/index.js'); // eslint-disable-next-line no-undef


const mdLinks = (path, options) => new promise(resolve => {
  if (options.validate === true) {
    resolve(functionValidateLinks(path));
  } else {
    resolve(functionExtractedLinkFile(path));
  }
});

exports.mdLinks = mdLinks;
mdLinks(pathModule.join(process.cwd(), 'prueba\\archivo.md'), {
  validate: true
}).then(val => console.log(val));