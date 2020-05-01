//==============
//Puerto
//==============

process.env.PORT = process.env.PORT || 3000;

//==============
//Entorno
//==============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==============
//Vencimiento token
//==============
// 60 segundos
// 60 minutos
// 24 horas
// 30 días

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//==============
//Semilla autenticación SEED
//==============

process.env.SEDD = process.env.SEDD || 'secret-desarrollo';

//==============
//BAse de datos
//==============

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URL_DB = urlDB;
