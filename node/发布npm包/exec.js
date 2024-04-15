#!/usr/bin/env node
const converbyte = require('./index.js');

const bytes = process.argv[2];
const type = process.argv[3];

console.log(converbyte(bytes,type));