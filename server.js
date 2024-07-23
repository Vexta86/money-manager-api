


// Importing packages

require('dotenv').config();

const app = require('./app')

// Setting the environment variable for PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})