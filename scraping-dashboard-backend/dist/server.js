"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const promise_1 = __importDefault(require("mysql2/promise"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8080;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Akila@2002',
    database: 'scraping'
};
// Function to connect to MySQL
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield promise_1.default.createConnection(dbConfig);
        console.log('Connected to MySQL');
        return connection;
    }
    catch (error) {
        console.error('Error connecting to MySQL:', error);
        throw error;
    }
});
// Endpoint to scrape a URL and store data
app.post('/api/scrape', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    console.log(`Received URL to scrape: ${url}`);
    let browser;
    try {
        browser = yield puppeteer_1.default.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = yield browser.newPage();
        yield page.goto(url, { waitUntil: 'networkidle2' });
        console.log(`Navigated to ${url}`);
        // Wait for 3 seconds
        yield delay(3000);
        // Extracting specific data
        const extractedData = yield page.evaluate(() => {
            var _a, _b;
            return {
                title: ((_a = document.querySelector('title')) === null || _a === void 0 ? void 0 : _a.innerText) || '',
                description: ((_b = document.querySelector('meta[name="description"]')) === null || _b === void 0 ? void 0 : _b.getAttribute('content')) || '',
            };
        });
        console.log('Extracted data:', extractedData);
        yield browser.close();
        if (!extractedData.title) {
            console.warn(`No title found for URL: ${url}`);
        }
        if (!extractedData.description) {
            console.warn(`No description found for URL: ${url}`);
        }
        const connection = yield connectToDB();
        const insertQuery = 'INSERT INTO scraped_data (url, title, description) VALUES (?, ?, ?)';
        const [results] = yield connection.execute(insertQuery, [url, extractedData.title, extractedData.description]);
        console.log('Scraped data inserted:', results);
        const insertedId = results.insertId;
        res.status(201).json(Object.assign({ id: insertedId, url }, extractedData));
    }
    catch (error) {
        if (browser) {
            yield browser.close();
        }
        console.error('Error scraping or inserting data:', error);
        res.status(500).json({ error: 'Failed to scrape or insert data' });
    }
}));
// Endpoint to fetch all scraped data
app.get('/api/scrapedData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield connectToDB();
        const [results] = yield connection.query('SELECT * FROM scraped_data');
        res.status(200).json(results);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// Function to introduce a delay using setTimeout wrapped in a Promise
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
