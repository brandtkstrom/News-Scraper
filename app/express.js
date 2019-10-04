// Initialize and export our Express app
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const PUBLIC = path.join(__dirname, '../public');
app.use(express.static(PUBLIC));
app.use(express.json())
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Register html and api routes
require('../routes/apiRoutes')(app);
require('../routes/htmlRoutes')(app);

module.exports = app;