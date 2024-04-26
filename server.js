// Importing packages
const http = require("http");
const app = require("./app");

// Setting the environment variable for PORT
const port = process.env.PORT || 8000;
const hostname = 'localhost'
const server = http.createServer(app);
server.listen(port, hostname, ()=>{
    console.log("listening on " + hostname + ':' + port);
});
