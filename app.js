// Init DB connection
const DB = require('./app/db');

// Init the Express app
const app = require('./app/server');

// Start server once connected to DB
const PORT = process.env.PORT || 3000;
DB.once('open', () => {
    console.log('Successfully connected to MongoDB!');
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
});