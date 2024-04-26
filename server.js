// Importing packages

const express = require('express')
const app = express()

// Setting the environment variable for PORT
const port = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})