# 🚀 Google Apps Script Web App Setup Guide

## Overview
This guide will help you deploy your lead capture form as a Google Apps Script Web App, allowing users to access the form directly via URL in their browser.

## 📁 Files Created
1. **`web_app_script.js`** - The main Google Apps Script code
2. **`lead_capture_form.html`** - The HTML form that will be served
3. **`WEB_APP_SETUP_GUIDE.md`** - This setup guide

## 🔧 Step-by-Step Setup

### Step 1: Create New Google Apps Script Project
1. Go to [script.google.com](https://script.google.com)
2. Click **"New Project"**
3. Rename the project to **"Lead Capture Form Web App"**

### Step 2: Add the Script Code
1. In the main editor, replace all content with the code from **`web_app_script.js`**
2. **IMPORTANT**: Update the `SPREADSHEET_ID` constant with your actual Google Sheet ID
3. Save the project (Ctrl+S or Cmd+S)

### Step 3: Add the HTML File
1. In the left sidebar, click the **"+"** button next to "Files"
2. Select **"HTML"**
3. Name it **`lead_capture_form`** (exactly this name - no .html extension)
4. Replace the content with the code from **`lead_capture_form.html`**
5. Save the file

### Step 4: Deploy as Web App
1. Click **"Deploy"** in the top right
2. Select **"New deployment"**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **"Web app"**
5. Configure the deployment:
   - **Execute as**: "Me" (your account)
   - **Who has access**: Choose one:
     - **"Anyone"** - Public access
     - **"Anyone with Google Account"** - Requires Google login
     - **"Only myself"** - Private access
6. Click **"Deploy"**
7. Click **"Authorize access"** if prompted
8. Grant necessary permissions
9. Copy the **Web app URL** - this is your form's public URL!

## 🌐 How It Works

### **doGet() Function**
- Serves the HTML form when users visit the web app URL
- Users see your beautiful form directly in their browser
- No need to host HTML files separately

### **doPost() Function**
- Processes form submissions
- Validates data
- Saves to Google Sheets
- Returns success/error messages

### **Form Submission**
- Form submits to the same URL (current page)
- Data is processed by the `doPost` function
- Results are displayed in the success/error modals

## 📊 Google Sheet Structure
The web app will create/use a sheet with these columns:
1. **TIMESTAMP** - When form was submitted
2. **FULL NAME** - User's full name
3. **EMAIL** - User's email address
4. **PASSWORD** - User's password
5. **REPEAT PASSWORD** - Password confirmation
6. **IP ADDRESS** - User's IP address
7. **CITY** - User's approximate city
8. **COUNTRY** - User's approximate country
9. **BROWSER** - User's browser details
10. **LEAD ID** - Unique identifier for each submission

## 🧪 Testing

### Test the Web App
1. Visit your web app URL
2. Fill out the form with test data
3. Submit and check your Google Sheet
4. Verify all data is captured correctly

### Test Function
1. In the Google Apps Script editor, select `testFunction` from the dropdown
2. Click the **"Run"** button
3. Check the execution log for results

## 🔒 Security Considerations

### **Access Control**
- Choose appropriate access level during deployment
- **"Anyone"** = Public (use with caution)
- **"Anyone with Google Account"** = More secure
- **"Only myself"** = Private testing

### **Data Protection**
- Passwords are stored in plain text in Google Sheets
- Consider additional encryption if needed
- Restrict sheet access to authorized users only

## 🚨 Troubleshooting

### **Common Issues**

#### Form Not Loading
- Check HTML file name is exactly `lead_capture_form`
- Verify deployment is successful
- Check browser console for errors

#### Form Submissions Not Working
- Ensure `SPREADSHEET_ID` is correct
- Check Google Apps Script execution logs
- Verify sheet permissions

#### Data Not Appearing in Sheet
- Run `testFunction` to verify script works
- Check sheet name matches `SHEET_NAME` constant
- Verify Google Apps Script has permission to access the sheet

### **Debug Steps**
1. Check **Execution logs** in Google Apps Script
2. Use **View → Execution log** to see detailed logs
3. Test individual functions using the **Run** button
4. Check browser **Developer Console** for frontend errors

## 📱 Features Included

### **Form Features**
- ✅ **German language** throughout
- ✅ **Password reveal/hide** with eye icons
- ✅ **Enhanced animations** with staggered fade-ins
- ✅ **Form validation** with German error messages
- ✅ **Responsive design** for mobile devices

### **Data Capture**
- ✅ **User information** (name, email, passwords)
- ✅ **Location data** (IP, city, country)
- ✅ **Browser details** and user agent
- ✅ **Timestamp** of submission
- ✅ **Unique lead ID** for each submission

### **User Experience**
- ✅ **Loading spinner** during submission
- ✅ **Success/error modals** in German
- ✅ **Smooth animations** and transitions
- ✅ **Professional styling** and layout

## 🎯 Next Steps

1. **Deploy the web app** following the steps above
2. **Test thoroughly** with various data inputs
3. **Share the URL** with your users
4. **Monitor submissions** in your Google Sheet
5. **Customize further** if needed

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Google Apps Script execution logs
3. Verify all file names and configurations
4. Test with the provided test functions

---

**🎉 Congratulations!** Your lead capture form is now a fully functional web app that users can access directly via URL!
