const { rgb } = require("pdf-lib");

// **Dùng Set để kiểm tra nhanh các cột cần merge**
const mergedColumns = new Set([1, 3]);

async function CreateBorderLine(rowCount, rowHeight, tableY, tableX, page, colCount, colWidth) {
    const lines = [];

    // **Vẽ đường ngang**
    for (let i = 0; i <= rowCount; i++) {
        const y = tableY - i * rowHeight;
        lines.push({
            start: { x: tableX, y },
            end: { x: tableX + colWidth * colCount, y },
            thickness: 1,
            color: rgb(0, 0, 0),
        });
    }

    // **Vẽ đường dọc (bỏ qua cột merge)**
    for (let i = 0; i <= colCount; i++) {
        if (mergedColumns.has(i)) continue;
        const x = tableX + i * colWidth;
        lines.push({
            start: { x, y: tableY },
            end: { x, y: tableY - rowHeight * rowCount },
            thickness: 1,
            color: rgb(1, 1, 1),
        });
    }

    // **Batch vẽ để giảm số lần gọi API**
    lines.forEach(line => page.drawLine(line));
}

module.exports = { CreateBorderLine };
