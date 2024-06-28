# Web Scraping Dashboard

This project is a web-based dashboard for scraping websites using Node.js, Express.js, Puppeteer, and MySQL. The frontend is built with Vue.js.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14 or later)
- npm (version 6 or later)
- MySQL (version 8 or later)

## Installation

### Backend

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/web-scraping-dashboard.git
    cd web-scraping-dashboard/scraping-dashboard-backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

### Frontend

1. Navigate to the frontend directory:

    ```bash
    cd ../scraping-dashboard-frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Database Setup

1. Create a MySQL database and user:

    ```sql
    CREATE DATABASE scraping;
    CREATE USER 'root'@'localhost' IDENTIFIED BY 'Akila@2002';
    GRANT ALL PRIVILEGES ON scraping.* TO 'root'@'localhost';
    FLUSH PRIVILEGES;
    ```

2. Run the migration script to set up the database schema. Create a file named `migrate.js` in the `scraping-dashboard-backend` directory and add the following code:

    ```javascript
    const mysql = require('mysql2/promise');

    const dbConfig = {
      host: 'localhost',
      user: 'root',
      password: 'Akila@2002',
      database: 'scraping'
    };

    const migrate = async () => {
      const connection = await mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password
      });

      await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
      await connection.query(`USE ${dbConfig.database}`);
      await connection.query(`
        CREATE TABLE IF NOT EXISTS scraped_data (
          id INT AUTO_INCREMENT PRIMARY KEY,
          url VARCHAR(255) NOT NULL,
          title VARCHAR(255),
          description TEXT,
          scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('Database and table setup complete');
      await connection.end();
    };

    migrate().catch(err => {
      console.error('Migration failed:', err);
    });
    ```

3. Run the migration script:

    ```bash
    node migrate.js
    ```

## Running the Project

### Backend

1. Start the server:

    ```bash
    npm start
    ```

2. The backend server will run on `http://localhost:8080`.

### Frontend

1. Start the frontend development server:

    ```bash
    npm run serve
    ```

2. The frontend server will run on `http://localhost:8080`.

## API Endpoints

### Scrape URL

- **Endpoint:** `/api/scrape`
- **Method:** POST
- **Request Body:**

    ```json
    {
      "url": "https://example.com"
    }
    ```

- **Response:**

    ```json
    {
      "id": 1,
      "url": "https://example.com",
      "title": "Example Domain",
      "description": "This domain is for use in illustrative examples in documents."
    }
    ```

### Fetch All Scraped Data

- **Endpoint:** `/api/scrapedData`
- **Method:** GET
- **Response:**

    ```json
    [
      {
        "id": 1,
        "url": "https://example.com",
        "title": "Example Domain",
        "description": "This domain is for use in illustrative examples in documents."
      }
    ]
    ```

## Usage Guide

1. **Accessing the Dashboard:**
   - Open your web browser and navigate to `http://localhost:8080`.
   - Use the dashboard to add URLs for scraping and view scraped data.

2. **Interacting with the Dashboard:**
   - **Adding URLs:** Enter a URL in the input field and click "Add URL".
   - **Fetching Scraped Data:** Click "Fetch Scraped Data" to refresh the data table.
   - **Sorting:** Click on column headers (`URL`, `Title`, `Description`) to sort data.
   - **Pagination:** Navigate through pages using "Previous" and "Next" buttons.

## Troubleshooting

- **Error Connecting to MySQL:**
  - Ensure MySQL is running.
  - Verify your database credentials in the `dbConfig` object.

- **Error Running Migration Script:**
  - Check the SQL syntax in the `migrate.js` script.
  - Ensure the MySQL user has the necessary permissions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.


