#! /usr/bin/env node
const cm = require('commander');
const fs = require('fs');
const checkNumbers = require('../controller/checkPhoneNumbers');

cm
    .version('1.0.0')
    .description('Get valid numbers');

cm
    .command('file <file>')
    .description('Talkdesk\'s recruitment process')
    .action(file => readFile(file));

cm.parse(process.argv);

async function readFile(file) {

    fs.readFile(file, 'utf8', (err, data) => {
        if( err ) throw  'error loading file';
        const lines = data.split(/\r?\n/);
        console.log( checkNumbers(lines) );
    });

    return true;
}