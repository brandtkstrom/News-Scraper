const mongoose = require('mongoose');

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

const DB = mongoose.createConnection(DB_URI, {useNewUrlParser: true});

DB.on('error', err => console.log('DB Error: ', err));

// Register Models
require('../models/Headline')(DB);

module.exports = DB;