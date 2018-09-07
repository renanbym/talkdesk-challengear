const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const multiparty = require('connect-multiparty');
const fs = require('fs');

const checkNumbers = require('./controllers/checkPhoneNumbers');


const app = express()
const server = http.createServer(app)

app.set('view engine', 'ejs')
app.set('views', './web')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 'extended': 'false' }))

app.use((req, res, next) => { res.setHeader('Access-Control-Allow-Origin', '*'); next(); })

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post( '/file', multiparty(), (req, res) => {
    fs.readFile(req.files.file.path, 'utf8', async (err, data) => {
        if( err ) throw  'error loading file';
        const lines = data.split(/\r?\n/);
        const content = checkNumbers(lines);
        res.setHeader('Content-Type', 'application/json');
        res.send(content);
    });
})

server.listen('3001')
    .on('listening', () => {
        console.log('run, forest!', process.env.NODE_ENV, '3001')
    })

module.exports = app