function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0];

    sheet.appendRow([
      data.nama,
      data.kelas,
      data.dosen,
      data.mataKuliah,
      data.status,
      data.tanggal,
      data.jam,
      data.foto
    ]);

    SpreadsheetApp.flush();

    return ContentService
      .createTextOutput(JSON.stringify({status: 'success', message: 'Data absensi berhasil disimpan'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function setupSheet() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0];
    const header = sheet.getRange(1, 1, 1, 8).getValues();

    if (header[0][0] !== 'Nama') {
      sheet.insertRow(1);
      sheet.getRange(1, 1, 1, 8).setValues([[
        'Nama',
        'Kelas',
        'Dosen Pengampu',
        'Mata Kuliah',
        'Status Kehadiran',
        'Tanggal',
        'Jam',
        'Foto'
      ]]);

      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1a1a1a');
      headerRange.setFontColor('#ffffff');
    }
  } catch (error) {
    Logger.log('Error saat setup sheet: ' + error.toString());
  }
}

function testPostRequest() {
  try {
    const testData = {
      nama: 'Test User',
      kelas: 'TI-3A',
      dosen: 'Dr. Andi',
      mataKuliah: 'Pemrograman Web',
      status: 'Hadir',
      tanggal: new Date().toLocaleDateString('id-ID', {year: 'numeric', month: '2-digit', day: '2-digit'}),
      jam: new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit', second: '2-digit'}),
      foto: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...' 
    };

    const mockEvent = {
      postData: {
        contents: JSON.stringify(testData)
      }
    };

    const result = doPost(mockEvent);
    Logger.log(result.getContent());
  } catch (error) {
    Logger.log('Test Error: ' + error.toString());
  }
}
