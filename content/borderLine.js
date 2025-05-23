const { rgb } = require("pdf-lib");

// Merge vùng: "rowIndex-colStart-colEnd"
const mergedCellAreas = new Set([
  "1-0-1", // TenNCC
  "2-3-4",
  "3-0-1", //TenStore
  "3-3-4",
  "3-3-4",
  "4-3-4",
]); // Merge cột theo từng hàng (ngang)

// Merge vùng: "colIndex-rowStart-rowEnd"
const mergedRowAreas = new Set([
  "2-2-3",
  "2-1-2",
  "3-3-4",
  "4-3-4",
  "3-2-3",
  "4-2-3",
]); // Merge hàng theo từng cột (dọc)

const CreateBorderLine = (
  rowCount,
  rowHeight,
  tableY,
  tableX,
  page,
  colCount,
  colWidth
) => {
  const lines = [];

  // Đường ngang (theo từng cột)
  for (let row = 0; row <= rowCount; row++) {
    const y = tableY - row * rowHeight;

    for (let col = 0; col < colCount; col++) {
      // Kiểm tra xem có nằm trong vùng merge dọc không
      let skip = false;
      mergedRowAreas.forEach((area) => {
        const [colIndex, rowStart, rowEnd] = area.split("-").map(Number);
        if (col === colIndex && row > rowStart && row <= rowEnd) {
          skip = true;
        }
      });
      if (skip) continue;

      const x1 = tableX + col * colWidth;
      const x2 = tableX + (col + 1) * colWidth;

      lines.push({
        start: { x: x1, y },
        end: { x: x2, y },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
    }
  }

  // Đường dọc từng đoạn giữa hàng
  for (let col = 0; col <= colCount; col++) {
    const x = tableX + col * colWidth;

    for (let row = 0; row < rowCount; row++) {
      // Kiểm tra nếu đang ở giữa vùng merge thì bỏ qua
      let skip = false;
      mergedCellAreas.forEach((area) => {
        const [rowIndex, colStart, colEnd] = area.split("-").map(Number);
        if (row === rowIndex && col > colStart && col <= colEnd) {
          skip = true;
        }
      });

      if (skip) continue;

      const y1 = tableY - row * rowHeight;
      const y2 = tableY - (row + 1) * rowHeight;

      lines.push({
        start: { x, y: y1 },
        end: { x, y: y2 },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
    }
  }

  lines.forEach((line) => page.drawLine(line));
};

module.exports = { CreateBorderLine, mergedCellAreas };
