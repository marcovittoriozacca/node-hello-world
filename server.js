const http = require('http');
require('dotenv').config();

//env variables (port and host)
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

//arguments array reset
process.argv.splice(0,2);

const randomQuote = () => {
    const argv = process.argv;
    let randomQuoteArray = [];

    //if we dont have any argument the random quote will be generated from this static array, otherwise we will generate it from the arguments array
    if(argv.length === 0){
        const importedQuotes = require('./quotes');
        importedQuotes.forEach((el) => {
            randomQuoteArray.push(el.quote);
        });
    }else{
        randomQuoteArray = argv;
    }
    const randomIndex = Math.floor(Math.random() * randomQuoteArray.length);
    return randomQuoteArray[randomIndex];
}

//create server function
http
    .createServer((req, res) => {
        //404 response for the favicon request
        if(req.url === '/favicon.ico'){
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end();
            return;
        }

        //status 200 for other requests
        res.writeHead(200, {"Content-Type": "text/html"});
        const quote = randomQuote();
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Random Quote</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body>
                    <h1 class="text-3xl p-5 font-bold text-center">${quote}</h1>
                </body>
            </html>`
        );

    }).listen(port, host, () => {
        const serverUrl = `http://${host}:${port}`;
        console.log(`Server avviato su ${serverUrl}`);

    })