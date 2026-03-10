import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function inspect() {
  try {
    const res = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'subscriptions'
    `);
    console.log("Database Columns for 'subscriptions':");
    console.table(res.rows);
  } catch (error) {
    console.error("Inspection failed:", error);
  } finally {
    await pool.end();
  }
}

inspect();
