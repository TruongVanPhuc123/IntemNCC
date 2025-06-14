const fs = require("fs");
const path = require("path");

const appendMaNCC = (maNCC, totalQuantity) => {
  // folder khong ton tai thi tao folder
  const logDir = path.join(__dirname, "logs");
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

  // Kiem tra file
  const today = new Date().toISOString().slice(0, 10);
  const logPath = path.join(logDir, `${today}.txt`);
  const now = `[${new Date().toLocaleString()}] ✅ MaNCC: ${maNCC} | TotalQuantity: `;

  // Ghi file
  let content = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";
  let lines = content.split("\n").filter((line) => line.trim());
  let updated = false;

  // Neu da co MaNCC nay thi cap nhat
  lines = lines.map((line) => {
    if (line.includes(`MaNCC: ${maNCC}`)) {
      const old = parseInt(line.match(/TotalQuantity: (\d+)/)?.[1] || "0", 10);
      updated = true;
      return `${now}${old + totalQuantity}`;
    }
    return line;
  });

  // Neu chua co MaNCC nay thi them
  if (!updated) lines.push(`${now}${totalQuantity}`);

  // Ghi file
  fs.writeFileSync(logPath, lines.join("\n") + "\n", "utf8");
};

module.exports = { appendMaNCC };
