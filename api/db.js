const { Pool } = require('pg');

let pool;

// Initialize PostgreSQL connection pool
function getPool() {
  if (!pool) {
    const connectionString = process.env.POSTGRES_URL;
    
    if (!connectionString) {
      throw new Error('PostgreSQL connection string not provided');
    }
    
    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false // Required for Supabase and most PostgreSQL providers on Vercel
      }
    });

    // Test the connection
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }
  
  return pool;
}

module.exports = { getPool }; 