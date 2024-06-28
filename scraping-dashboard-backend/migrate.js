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
