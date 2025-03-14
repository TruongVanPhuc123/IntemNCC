const { rgb } = require("pdf-lib");

// **Merge cell**
const mergedCells = [
    { row: 1, colStart: 0, colEnd: 3 }, // Gộp "Số hóa đơn"
    { row: 2, colStart: 2, colEnd: 5 }, // Gộp "QR text"
    { row: 3, colStart: 2, colEnd: 5 }, // Gộp "Hàng KM TP HSD Ngắn"
];

async function CreateBorderLine(rowCount, rowHeight, tableY, tableX, page, colCount, colWidth, next) {
    try {
        for (let i = 0; i <= rowCount; i++) {
            const y = tableY - i * rowHeight;
            page.drawLine({
                start: { x: tableX, y },
                end: { x: tableX + colWidth * colCount, y },
                thickness: 1,
                color: rgb(0, 0, 0),
            });
        }

        for (let i = 0; i <= colCount; i++) {
            if (mergedCells.some((cell) => i === cell.colStart + 1)) continue;
            const x = tableX + i * colWidth;
            page.drawLine({
                start: { x, y: tableY },
                end: { x, y: tableY - rowHeight * rowCount },
                thickness: 1,
                color: rgb(0, 0, 0),
            });
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { CreateBorderLine }