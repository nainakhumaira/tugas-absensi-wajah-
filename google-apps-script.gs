/**
 * Google Apps Script untuk Sistem Absensi Wajah
 * 
 * Cara menggunakan:
 * 1. Buat Google Spreadsheet baru
 * 2. Buka Extensions > Apps Script
 * 3. Copy-paste kode ini ke editor
 * 4. Jalankan function ini sekali untuk authorize
 * 5. Deploy as Web App (Execute as: Anda, Who has access: Anyone)
 * 6. Copy deployment URL ke app.js
 */

function doPost(e) {
  try {
    // Parse incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and first sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0];
    
    // Log data untuk debugging
    Logger.log('Data diterima: ' + JSON.stringify(data));
    
    // Append row dengan data absensi
    sheet.appendRow([
      data.nama,           // Nama mahasiswa
      data.tanggal,        // Tanggal absensi
      data.jam,            // Waktu absensi
      data.foto            // Foto wajah (base64)
    ]);
    
    // Flush agar perubahan langsung tersimpan
    SpreadsheetApp.flush();
    
    Logger.log('Data berhasil disimpan');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data absensi berhasil disimpan'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error untuk debugging
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Function untuk setup sheet dengan header jika belum ada
 * Jalankan ini sekali setelah membuat spreadsheet baru
 */
function setupSheet() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0];
    
    // Check apakah header sudah ada
    const firstRow = sheet.getRange(1, 1, 1, 4).getValues();
    
    if (firstRow[0][0] !== 'Nama') {
      // Tambahkan header jika belum ada
      sheet.insertRow(1);
      sheet.getRange(1, 1, 1, 4).setValues([['Nama', 'Tanggal', 'Jam', 'Foto']]);
      
      // Format header
      const headerRange = sheet.getRange(1, 1, 1, 4);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1a1a1a');
      headerRange.setFontColor('#ffffff');
      
      Logger.log('Sheet berhasil disetup dengan header');
    } else {
      Logger.log('Header sudah ada');
    }
  } catch (error) {
    Logger.log('Error saat setup sheet: ' + error.toString());
  }
}

/**
 * Function untuk testing POST request
 * Gunakan ini untuk test Google Apps Script sebelum deploy
 */
function testPostRequest() {
  try {
    const testData = {
      nama: 'Test User',
      tanggal: new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
      jam: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      foto: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...(test data truncated)'
    };
    
    // Simulate POST request
    const mockEvent = {
      postData: {
        contents: JSON.stringify(testData)
      }
    };
    
    const result = doPost(mockEvent);
    Logger.log('Test Result: ' + result.getContent());
  } catch (error) {
    Logger.log('Test Error: ' + error.toString());
  }
}

/**
 * Function untuk mendapatkan info tentang spreadsheet
 */
function getSpreadsheetInfo() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0];
    const lastRow = sheet.getLastRow();
    const lastColumn = sheet.getLastColumn();
    
    Logger.log('Spreadsheet ID: ' + spreadsheet.getId());
    Logger.log('Sheet Name: ' + sheet.getName());
    Logger.log('Last Row: ' + lastRow);
    Logger.log('Last Column: ' + lastColumn);
    Logger.log('Total Records: ' + (lastRow - 1)); // Exclude header
  } catch (error) {
    Logger.log('Error: ' + error.toString());
  }
}
