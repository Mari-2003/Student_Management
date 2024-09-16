const mongoose = require('mongoose');

const mongooseConnection =  process.env.DB_CONNECTION_STRING;

mongoose.connect(mongooseConnection,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const db = mongoose.connection;

module.exports = db;
