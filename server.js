require('dotenv').config();

//env variables (port and host)
const port = process.env.PORT;
const host = process.env.HOST;

console.log(`Host: ${host} | Port: ${port}`);