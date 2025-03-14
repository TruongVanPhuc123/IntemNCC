const XLSX = require('xlsx');

// **Hàm đọc Excel UTF-8**
function readExcelWithUTF8(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet, { raw: false, defval: "" });
}

module.exports = { readExcelWithUTF8 }