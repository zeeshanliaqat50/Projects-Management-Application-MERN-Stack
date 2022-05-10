const express = require('express');
const app = express();
const fileHandler = require('fs');


app.post('/api', (req, res) => {
    console.log("test")
    fileHandler.writeFile('data.json', `{title: ${req.query.id}}`, (err) => {
       
        if (err) throw err;
        res.send('File created!');
    });
})


app.get('/api', function (req, res) {
    console.log("get")
    fileHandler.readFile('data.json', (err, data) => {
        if (err) res.send('File not found. First post to create file.');
        else
            res.send(`find me ${data}`);
    })
})



app.put('/', (req, res) => {
    fileHandler.writeFile('data.json', `{name: ${req.params.id}}`, (err) => {
        if (err) throw err;
        res.send('File updated!');
    });
})

app.delete('/', (req, res) => {
    fileHandler.unlink('data.json', (err) => {
        if (err) res.send('File not found. First post to create file.');
        else
            res.send('File deleted!');
    });
})


module.exports = app
