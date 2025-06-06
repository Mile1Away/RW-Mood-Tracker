# Deployment Guide for Mood Tracker App

This guide will walk you through the steps to deploy the Mood Tracker App to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer

## Step 1: Create a New GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account.
2. Click on the "+" icon in the top right corner and select "New repository".
3. Name your repository `mood-tracker`.
4. Make sure the repository is set to "Public" (GitHub Pages requires this for free accounts).
5. Click "Create repository".

## Step 2: Push the Code to GitHub

Open a terminal or command prompt and run the following commands:

```bash
# Navigate to the mood-tracker directory
cd /path/to/mood-tracker

# Initialize a Git repository if not already done
git init

# Add all files to Git
git add .

# Commit the files
git commit -m "Initial commit"

# Add your GitHub repository as a remote
git remote add origin https://github.com/YOUR_USERNAME/mood-tracker.git

# Push the code to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Configure GitHub Pages

The repository includes a GitHub Actions workflow file that will automatically build and deploy the app to GitHub Pages whenever you push changes to the main branch.

To enable GitHub Pages:

1. Go to your repository on GitHub.
2. Click on "Settings" tab.
3. Scroll down to the "Pages" section in the left sidebar.
4. Under "Build and deployment", select "GitHub Actions" as the source.
5. The workflow will run automatically after your first push.

## Step 4: Access Your Deployed App

After the GitHub Actions workflow completes successfully (this may take a few minutes), your app will be available at:

```
https://YOUR_USERNAME.github.io/mood-tracker/
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Making Updates

Whenever you want to update your app:

1. Make your changes to the code.
2. Commit the changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
3. Push to GitHub:
   ```bash
   git push
   ```

The GitHub Actions workflow will automatically rebuild and redeploy your app.

## Troubleshooting

If your deployment fails:

1. Go to the "Actions" tab in your GitHub repository.
2. Click on the failed workflow run.
3. Examine the logs to identify the issue.

Common issues include:
- Incorrect repository name in the vite.config.js `base` path
- Missing permissions for GitHub Actions

## Local Testing

Before pushing changes, you can test the production build locally:

```bash
npm run build
npm run preview
```

This will build the app and serve it locally, allowing you to verify everything works as expected.

