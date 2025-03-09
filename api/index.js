const { getPool } = require('./db');

module.exports = async (req, res) => {
  console.log('API called with method:', req.method);
  console.log('API URL:', req.url);
  
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request for CORS preflight');
    return res.status(200).end();
  }
  
  // Add a health check endpoint
  if (req.url === '/api/health' || req.url === '/health') {
    console.log('Health check endpoint called');
    return res.status(200).json({
      isSuccess: true,
      message: 'API is healthy',
      timestamp: new Date().toISOString()
    });
  }
  
  try {
    // Only proceed with DB operations if method is POST
    if (req.method === 'POST') {
      try {
        console.log('Attempting database connection');
        const pool = getPool();
        
        if (!pool) {
          console.log('No database pool available');
          return res.status(200).json({
            isSuccess: true,
            message: 'API is working but database is not configured',
            data: {
              apiVersion: '1.0.0',
              message: 'API is operational but database features are disabled'
            }
          });
        }
        
        // Basic query to test connection
        console.log('Executing database query');
        const result = await pool.query('SELECT NOW()');
        
        return res.status(200).json({
          isSuccess: true,
          message: 'Database connected successfully',
          data: {
            serverTime: result.rows[0].now,
            message: 'PostgreSQL connection is working'
          }
        });
      } catch (dbError) {
        console.error('Database Error:', dbError);
        
        return res.status(500).json({
          isSuccess: false,
          message: 'Database connection error',
          error: dbError.message
        });
      }
    }
    
    // For GET requests, just return success message without DB query
    return res.status(200).json({
      isSuccess: true,
      message: 'API is working',
      data: {
        apiVersion: '1.0.0',
        message: 'Welcome to ProjectLedger API',
        documentation: 'View the API documentation by visiting the root URL'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    
    return res.status(500).json({
      isSuccess: false,
      message: 'An error occurred',
      error: error.message
    });
  }
}; 