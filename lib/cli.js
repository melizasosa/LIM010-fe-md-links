#!/usr/bin/env node
"use strict";

var _index = require("./index.js");

const args = process.argv.slice(2);
(0, _index.functionMdLinksCli)(args[0], args[1], args[2]).then(res => console.log(res));