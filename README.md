# ProjectLedger Documentation Deployment

This repository contains the API documentation for the ProjectLedger platform, ready to be deployed on Vercel.

## Structure

- `/static` - Static documentation files using Swagger UI
- `/api` - Optional API endpoints for PostgreSQL connection testing

## Local Development

To run the documentation locally:

```bash
# If you have a simple HTTP server installed
npx serve

# Or using Python
python -m http.server
```

Then navigate to `http://localhost:5000/static/index.html` or whichever port your server is running on.

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