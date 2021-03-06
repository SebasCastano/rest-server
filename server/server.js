
require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
 
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//configuracion global de rutas
app.use(require('./routes/index'));

//al user 'use' se implementan middleware

mongoose.connect(process.env.URL_DB,
{ useNewUrlParser: true, useCreateIndex: true}, (err, res) =>{
  if(err) throw err;
  console.log('Base de datos ONLINE'); 
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
});