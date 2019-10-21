const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'mysql-container',
    user: 'root',
    password: 'programadorabordo',
    database: 'programadorabordo'
});

connection.connect();


const app = express();

const port = 9001;

app.listen(port, '0.0.0.0', () => {
    console.log(`listen on port ${port}`)
});

app.get('/products', (req, res) => {
    connection.query('select id, name, price from products', (error, results) => {

        console.log('teste');

        if (error) {
            res.status(500).send(JSON.stringify(error));
        } else {
            res.status(200).send(results.map(result => ({ name: result.name, price: result.price })));
        }
    });
});