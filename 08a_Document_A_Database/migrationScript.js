import mysql from 'mysql2';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mysqlConnection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

const mongoUrl = process.env.DB_URL;

async function migrateData() {
  let client;
  try {
    mysqlConnection.connect();

    client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db();

    const categories = await mysqlQuery('SELECT * FROM categories');
    await db.collection('categories').insertMany(categories);

    const products = await mysqlQuery('SELECT * FROM products');
    await db.collection('products').insertMany(products);

    const productCategories = await mysqlQuery('SELECT * FROM product_categories');
    await db.collection('product_categories').insertMany(productCategories);

    console.log('Migration complete.');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    mysqlConnection.end();
    if (client) client.close();
  }
}

function mysqlQuery(sql) {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

migrateData();
