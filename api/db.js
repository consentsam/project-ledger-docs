const { Pool } = require('pg');

let pool;

// Initialize PostgreSQL connection pool
function getPool() {
  if (!pool) {
    try {
      const connectionString = process.env.POSTGRES_URL;
      
      if (!connectionString) {
        console.warn('PostgreSQL connection string not provided, some features may be limited');
        return null;
      }
      
      pool = new Pool({
        connectionString,
        ssl: {
          rejectUnauthorized: false // Required for Supabase and most PostgreSQL providers on Vercel
        },
        // Add connection timeouts
        connectionTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
        max: 10 // Maximum number of clients in the pool
      });

      // Test the connection
      pool.on('error', (err) => {
        console.error('Unexpected error on idle client', err);
        // Don't exit process, just log the error
        pool = null;
      });
      
      console.log('PostgreSQL pool created successfully');
    } catch (error) {
      console.error('Error creating PostgreSQL pool:', error);
      return null;
    }
  }
  
  return pool;
}

module.exports = { getPool }; 