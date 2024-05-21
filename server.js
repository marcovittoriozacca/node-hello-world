const http = require('http');
require('dotenv').config();

//env variables (port and host)
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

const randomQuote = () => {
    process.argv.splice(0);
    const randomQuoteArray = ['quote1', 'quote2', 'quote3', 'quote4'];
    const randomIndex = Math.floor(Math.random() * randomQuoteArray.length);
    return randomQuoteArray[randomIndex];
}

//create server function
http
    .createServer((req, res) => {
        
        res.writeHead(200, {"Content-Type": "text/html"});
        const quote = randomQuote();
        res.end(`<h1>${quote}</h1>`);

    }).listen(port, host, () => {
        const serverUrl = `http://${host}:${port}`;
        console.log(`Server avviato su ${serverUrl}`);

    })