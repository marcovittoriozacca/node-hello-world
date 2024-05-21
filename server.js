const http = require('http');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

//env variables (port and host)
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

//arguments array reset
process.argv.splice(0,2);

//function that gets a random quote from argument/external array
const randomQuote = () => {
    const argv = process.argv;
    let randomQuoteArray = [];

    //if we dont have any argument the random quote will be generated from this static array, otherwise we will generate it from the arguments array
    if(argv.length === 0){

        //external quotes array
        const importedQuotes = require('./quotes');
        importedQuotes.forEach((el) => {
            randomQuoteArray.push(el.quote);
        });
    }else{
        randomQuoteArray = argv;
    }
    //get a random index end return the element associated with that index
    const randomIndex = Math.floor(Math.random() * randomQuoteArray.length);
    return randomQuoteArray[randomIndex];
}

//create server method
http
    .createServer((req, res) => {
        //setting up the favicon
        if(req.url === '/favicon.ico'){
            const favicon = path.join(__dirname, 'public', 'favicon.ico');
            res.setHeader('Content-Type', 'image/x-icon');
            fs.createReadStream(favicon).pipe(res);
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
                    
                    <h2 class="text-2xl font-semibold">${process.env.STATIC_QUOTE} - From <span class="underline">.env</span> File</h2>
                </body>
            </html>`
        );

    }).listen(port, host, () => {
        const serverUrl = `http://${host}:${port}`;
        console.log(`Server avviato su ${serverUrl}`);

    })