const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000

require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
})


// Defining get request at '/items' route
app.get('/items', (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    let sql = 'SELECT `name`,`info` FROM `owned_object` ORDER BY `name` ASC,`info` ASC;';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})


// Defining get request at '/acquisitions' route
app.get('/acquisitions', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let sql = 'SELECT `person`.`name` AS "owner_name",`owned_object`.`name` AS "item",`owned_object`.`info`' +
        'FROM `person`, `owned_object`, `acquisition`' +
        'WHERE `person`.`id` = `acquisition`.`owner`' +
        'AND `owned_object`.`id` = `acquisition`.`item`' +
        'ORDER BY `person`.`name`';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})


// Defining get request at '/latest4' route
app.get('/latest4', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let sql = 'SELECT * ' +
        'FROM `acquisition`' +
        'ORDER BY `acquisition_datetime` DESC LIMIT 4;';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})