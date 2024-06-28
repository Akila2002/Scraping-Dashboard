import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import puppeteer from 'puppeteer';
import cors from 'cors';
import { OkPacket } from 'mysql2';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Akila@2002',
  database: 'scraping'
};

// Function to connect to MySQL

const connectToDB = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    throw error;
  }
};

// Endpoint to scrape a URL and store data
app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;
  console.log(`Received URL to scrape: ${url}`);

  let browser;
  try {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    console.log(`Navigated to ${url}`);

    // Wait for 3 seconds
    await delay(3000);

    // Extracting specific data
    const extractedData = await page.evaluate(() => {
      return {
        title: document.querySelector('title')?.innerText || '',
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      };
    });
    console.log('Extracted data:', extractedData);

    await browser.close();

    if (!extractedData.title) {
      console.warn(`No title found for URL: ${url}`);
    }
    if (!extractedData.description) {
      console.warn(`No description found for URL: ${url}`);
    }

    const connection = await connectToDB();
    const insertQuery = 'INSERT INTO scraped_data (url, title, description) VALUES (?, ?, ?)';
    const [results] = await connection.execute(insertQuery, [url, extractedData.title, extractedData.description]) as OkPacket[];

    console.log('Scraped data inserted:', results);
    const insertedId = results.insertId;
    res.status(201).json({ id: insertedId, url, ...extractedData });

  } catch (error) {
    if (browser) {
      await browser.close();
    }
    console.error('Error scraping or inserting data:', error);
    res.status(500).json({ error: 'Failed to scrape or insert data' });
  }
});

// Endpoint to fetch all scraped data
app.get('/api/scrapedData', async (req, res) => {
  try {
    const connection = await connectToDB();
    const [results] = await connection.query('SELECT * FROM scraped_data');
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Function to introduce a delay using setTimeout wrapped in a Promise
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
