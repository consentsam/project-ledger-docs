# ProjectLedger Documentation Deployment

This repository contains the API documentation for the ProjectLedger platform, ready to be deployed on Vercel.

## Structure

- `/static` - Static documentation files using Swagger UI
  - `openapi.json` - The complete OpenAPI specification
  - `index.html` - Main documentation page
  - `how-to-use.html` - Guide for using the API
- `/api` - Optional API endpoints for PostgreSQL connection testing
- `CURL-EXAMPLES.md` - Examples of curl commands for interacting with the API

## API Updates

The API specification has been updated to use `role` instead of `userType` for user registration and profile management. This change ensures compatibility with the current API implementation.

## Important Note for Freelancer Registration

⚠️ **Known Issue**: There is currently a naming discrepancy in the API's freelancer registration process. The API validation expects `freelancerName` in the request, but the database uses a column named `name`. 

For now, you must use the `freelancerName` field in your API requests:

```json
{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "role": "freelancer",
  "freelancerName": "John Doe",
  "skills": ["JavaScript", "React", "Web3"]
}
```

The development team is working to resolve this inconsistency.

## Local Development

To run the documentation locally:

```bash
# If you have a simple HTTP server installed
npx serve

# Or using Python
python -m http.server
```

Then navigate to `http://localhost:5000/static/index.html` or whichever port your server is running on.

## Using the API with curl

For examples of how to interact with the API using curl, please refer to the [CURL-EXAMPLES.md](./CURL-EXAMPLES.md) file. This includes examples for:

- User registration and profile management
- Project creation and management
- Submission handling

## Deployment to Vercel

### Prerequisites

1. [Create a Vercel account](https://vercel.com/signup) if you don't already have one
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Have a PostgreSQL database setup (Vercel Postgres, Supabase, or any other provider)

### Deployment Steps

1. Login to Vercel from the command line:
   ```bash
   vercel login
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. During deployment, Vercel will ask a few questions:
   - Set up and deploy?: `Y`
   - Which scope?: Select your account or team
   - Link to existing project?: `N`
   - What's your project's name?: `project-ledger-docs` (or choose a different name)
   - In which directory is your code located?: `.` (current directory)
   - Want to override the settings?: `N`

4. After deployment completes, your site will be available at a URL like: `https://project-ledger-docs.vercel.app`

### Connecting to PostgreSQL

To connect your deployment to PostgreSQL:

1. Create a PostgreSQL database (if you don't already have one)
2. In your Vercel dashboard, go to your project settings
3. Navigate to "Environment Variables"
4. Add a new environment variable:
   - Name: `POSTGRES_URL`
   - Value: Your PostgreSQL connection string (e.g., `postgres://user:password@host:port/database`)
5. Click "Save"
6. Redeploy your project to apply the new environment variable

## Testing PostgreSQL Connection

Once deployed with a valid PostgreSQL connection string, you can test the connection by sending a POST request to your API endpoint:

```bash
curl -X POST https://your-vercel-app-url.vercel.app/api
```

## Custom Domain (Optional)

To use a custom domain:

1. In your Vercel dashboard, go to your project
2. Click on "Settings" → "Domains"
3. Add your custom domain and follow the verification steps

## Troubleshooting

- If you encounter deployment issues, check the Vercel deployment logs
- For PostgreSQL connection issues, verify your connection string is correct and that your IP is allowed in the database firewall settings
- If the static files aren't being served correctly, verify your `vercel.json` configuration

## Need Help?

For assistance with this deployment, contact the ProjectLedger development team. 