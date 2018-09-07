#! /usr/bin/env node
const fs = require('fs');

const querystring = require('querystring')
const arguments = process.argv.splice(2, process.argv.length -1).join(' ')
const search    = querystring.stringify({ address: arguments })

console.log( search );