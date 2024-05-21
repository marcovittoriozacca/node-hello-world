const http = require('http');
require('dotenv').config();

//env variables (port and host)
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

//create server function
http
    .createServer((req, res) => {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("Hello World");
    }).listen(port, host, () => {
        const serverUrl = `http://${host}:${port}`;
        console.log(`Server avviato su ${serverUrl}`);
    })