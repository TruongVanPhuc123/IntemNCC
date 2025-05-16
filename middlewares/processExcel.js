const xlsx = require("xlsx");

const processExcel = (fileBuffer) => {
  const workbook = xlsx.read(fileBuffer, {
    type: "buffer",
    cellText: false,
    cellDates: true,
  });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  return data;
};

module.exports = { processExcel };
