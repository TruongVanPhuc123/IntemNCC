const fs = require("fs");
const path = require("path");

const genrateErrorTem = async (maStore, maBooking, maNCC, error) => {
  // --- Tạo folder logs nếu chưa có
  const logDir = path.join(__dirname, "logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // --- Ghi log theo ngày và theo maNCC
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const fileName = `${today}_${maNCC}.txt`;
  const logPath = path.join(logDir, fileName);

  const errorMsg = `[${new Date().toLocaleString()}] ❌ Lỗi maStore: ${maStore} | Booking: ${maBooking}\n${
    error.stack
  }\n\n`;
  fs.appendFileSync(logPath, errorMsg);
};

module.exports = { genrateErrorTem };
