const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// CORS setup
app.use(cors({
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
}));

// JSON body parser
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.send("Server is running!");
});

// Endpoint for handling requests
app.post('/requests', async (req, res) => {
    const { url } = req.body;

    try {
        const browser = await puppeteer.launch({
            args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
                "--single-process",
                "--no-zygote",
            ],
            executablePath:
                process.env.NODE_ENV === "production"
                    ? process.env.PUPPETEER_EXECUTABLE_PATH
                    : puppeteer.executablePath(),
        });
        const page = await browser.newPage();

        await page.setRequestInterception(true);

        page.on('request', request => {
            request.continue();
        });

        const result = [];

        page.on('response', async response => {
            const request = response.request();
            const responseHeader = response.headers();
            const requestHeader = request.headers();
            const request_url = request.url();
            const response_status = response.status();
            const response_type = response.headers()['content-type'];
            const response_size = (await response.buffer()).length;
            const request_method = request.method();
            const remote_address = `${request.url().split('/')[2]}`;

            result.push({
                request_url,
                request_method,
                response_status,
                response_type,
                response_size,
                remote_address,
                requestHeader,
                responseHeader
            });
        });

        await page.goto(url, {
            waitUntil: 'networkidle0',
        });

        await browser.close();

        res.json(result);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Something went wrong');
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
