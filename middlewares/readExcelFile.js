const xlsx = require("xlsx");

function readExcelWithUTF8(input) {
    try {
        const isBuffer = Buffer.isBuffer(input);
        const workbook = isBuffer
            ? xlsx.read(input, { type: "buffer", cellText: false, cellDates: true })
            : xlsx.readFile(input, { cellText: false, cellDates: true });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        return xlsx.utils.sheet_to_json(sheet, { defval: "" }); // Trả về JSON, tránh `undefined`
    } catch (error) {
        console.error("Error reading Excel file:", error.message);
        return [];
    }
}

module.exports = { readExcelWithUTF8 };
