// Initialize the Express app
const app = require('./app');

// Listen for connections
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));