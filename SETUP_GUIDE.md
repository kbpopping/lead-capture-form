# Google Apps Script Setup Guide for Lead Capture Form

## Step 1: Create Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Delete the default code and paste the entire content from `google_apps_script.js`
4. Save the project with a name like "Lead Capture Form Handler"

## Step 2: Set Up Google Sheet

### Option A: Use Existing Sheet
1. Open your Google Sheet
2. Copy the Spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
3. In the Apps Script, replace `YOUR_SPREADSHEET_ID_HERE` with your actual ID

### Option B: Create New Sheet (Recommended for Testing)
1. In the Apps Script editor, run the `createTestSpreadsheet()` function
2. Check the logs to get the new Spreadsheet ID
3. Copy that ID and replace `YOUR_SPREADSHEET_ID_HERE` in the script

## Step 3: Deploy the Script

1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set "Execute as" to "Me"
4. Set "Who has access" to "Anyone"
5. Click "Deploy"
6. **Copy the Web App URL** - this is your new script URL

## Step 4: Update Your Form

1. Open `lead_capture_form.html`
2. Replace the `SCRIPT_URL` constant with your new deployment URL
3. Save the file

## Step 5: Test the Integration

1. Open your updated form in a browser
2. Fill out and submit the form
3. Check your Google Sheet for new entries
4. Check the Apps Script logs for any errors

## Troubleshooting

### If you get permission errors:
- Make sure the script is deployed as a web app
- Check that "Who has access" is set to "Anyone"
- Verify the Spreadsheet ID is correct

### If data isn't appearing in the sheet:
- Check the Apps Script logs for errors
- Verify the sheet name matches (default is "Leads")
- Make sure you have edit permissions on the spreadsheet

### To check logs:
- In the Apps Script editor, click "Executions" in the left sidebar
- Look for recent executions and check the logs

## Data Structure

The script will create a sheet with these columns:
- Timestamp
- Full Name
- Email
- Phone
- IP Address
- City
- Country
- Browser
- Lead ID

Each submission gets a unique Lead ID for tracking.
