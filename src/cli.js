#!/usr/bin/env node
import { functionMdLinksCli } from './mdLinksCli.js';

const args = process.argv.slice(2);

functionMdLinksCli(args[0], args[1], args[2]).then((res) => console.log(res));
