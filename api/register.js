const { getPool } = require('./db');

// Sample register endpoint matching the OpenAPI spec
module.exports = async (req, res) => {
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
    return res.status(200).end();
  }
  
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({
        isSuccess: false,
        message: 'Method not allowed',
        errors: { method: ['Only POST method is allowed for this endpoint'] }
      });
    }
    
    // This is a demo endpoint that simulates registration
    // In a real application, you would validate input and store in database
    
    const body = req.body || {};
    
    // Validate required fields
    const errors = {};
    
    if (!body.role) {
      errors.role = ['Role is required'];
    } else if (!['company', 'freelancer'].includes(body.role)) {
      errors.role = ['Role must be either "company" or "freelancer"'];
    }
    
    if (!body.walletAddress) {
      errors.walletAddress = ['Wallet address is required'];
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(body.walletAddress)) {
      errors.walletAddress = ['Invalid Ethereum wallet address format'];
    }
    
    // Role-specific validation
    if (body.role === 'company' && !body.companyName) {
      errors.companyName = ['Company name is required for company profiles'];
    }
    
    if (body.role === 'freelancer' && !body.freelancerName) {
      errors.freelancerName = ['Freelancer name is required for freelancer profiles'];
    }
    
    // Return validation errors if any
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Validation failed',
        errors
      });
    }
    
    // Simulate successful registration with a mock profile ID
    const profileId = 'f290c15c-a0bf-494a-8df0-05e94aa3b89f';
    
    return res.status(200).json({
      isSuccess: true,
      message: 'Successfully registered profile',
      data: profileId
    });
    
  } catch (error) {
    console.error('API Error:', error);
    
    return res.status(500).json({
      isSuccess: false,
      message: 'Internal server error occurred',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
}; 