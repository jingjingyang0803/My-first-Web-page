const express = require('express')
const app = express()
const port = 3000

// Defining get request at '/json' route
app.get('/json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        Monday: 0, Tuesday: 1, Wednesday: 2, Thusday: 3, Friday: 4, Saturday: 5, Sunday: 6
    }, null, 3));
})

// Defining get request at '/html' route
app.get('/html', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Days of the Week</title>
        <style type="text/css">
            h1 {
                text-align: center;
                font-family: sans-serif, arial, verdana;
                font-size: 58px;
                color: #F75D1F;
            }
    
            table {
                margin-left: auto;
                margin-right: auto;
                width: 38%;
                text-align: center;
                font-size: 38px;
            }
    
            table,
            th,
            td {
                border: 1px solid #FDFEF9;
                border-collapse: collapse;
                height: 100px;
            }
    
            th {
                background-color: #19679D;
                color: #FDFEF9;
            }
    
            td {
                background-color: #A3D6F1;
            }
        </style>
    </head>
    
    <body>
        <h1>Days of the Week</h1>
        <table>
            <tr>
                <th>Day</th>
                <th>Index</th>
            </tr>
            <tr>
                <td>Monday</td>
                <td>0</td>
            </tr>
            <tr>
                <td>Tuesday</td>
                <td>1</td>
            </tr>
            <tr>
                <td>Wednesday</td>
                <td>2</td>
            </tr>
            <tr>
                <td>Thusday</td>
                <td>3</td>
            </tr>
            <tr>
                <td>Friday</td>
                <td>4</td>
            </tr>
            <tr>
                <td>Saterday</td>
                <td>5</td>
            </tr>
            <tr>
                <td>Sunday</td>
                <td>6</td>
            </tr>
        </table>
    </body>
    
    </html>`);
})


// Defining get request at '/html/:index' route
app.get('/html/:index', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Days of the Week</title>
        <style type="text/css">
            h1 {
                text-align: center;
                font-family: sans-serif, arial, verdana;
                font-size: 58px;
                color: #F75D1F;
            }
    
            table {
                margin-left: auto;
                margin-right: auto;
                width: 38%;
                text-align: center;
                font-size: 38px;
            }
    
            table,
            th,
            td {
                border: 1px solid #FDFEF9;
                border-collapse: collapse;
                height: 100px;
            }
    
            th {
                background-color: #19679D;
                color: #FDFEF9;
            }
    
            td {
                background-color: #A3D6F1;
            }
        </style>
    </head>
    
    <body>
    <h1>Days of the Week</h1>
    <table>
        <tr>
            <th>Day</th>
            <th>Index</th>
        </tr>
        <tr>
            <td id="day"></td>
            <td>${req.params.index}</td>
        </tr>
    </table>
    <script>
        let day = ['Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturday', 'Sunday'];
        document.getElementById("day").innerHTML = day[${req.params.index}];
    </script>
</body>
    
    </html>`);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})