// Google Apps Script für Google Sheets
// Dieser Code muss in Google Sheets unter Erweiterungen > Apps Script eingefügt werden

function doPost(e) {
    try {
      // Hole die aktive Tabelle
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      
      // Parse die Daten
      const data = JSON.parse(e.postData.contents);
      
      // Erstelle eine neue Zeile mit den Daten
      const row = [
        data.sessionId,
        data.timestamp,
        data.frage1,
        data.frage2,
        data.frage3,
        data.frage4,
        data.frage5,
        data.frage6
      ];
      
      // Füge die Zeile hinzu
      sheet.appendRow(row);
      
      // Erfolgsantwort
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Daten erfolgreich gespeichert'
      })).setMimeType(ContentService.MimeType.JSON);
      
    } catch (error) {
      // Fehlerantwort
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  // Initialisiere das Sheet mit Headern (einmalig ausführen)
  function setupSheet() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Header-Zeile
    const headers = [
      'Session ID',
      'Timestamp',
      'Frage 1',
      'Frage 2',
      'Frage 3',
      'Frage 4',
      'Frage 5',
      'Frage 6'
    ];
    
    // Füge Header hinzu
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Formatierung
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
    
    Logger.log('Sheet erfolgreich eingerichtet!');
  }