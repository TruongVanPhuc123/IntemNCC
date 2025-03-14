const { getCenteredTextX } = require("../middlewares/getCenteredTextX");
const { rgb } = require("pdf-lib");

async function Content_Temp(headers, dataTable, page, tableX, tableY, colWidth, rowHeight, customFont, next) {
    try {
        const specialKeywords = ["TEM"]

        page.drawRectangle({
            x: tableX,
            y: tableY - rowHeight,
            width: colWidth * headers.length,
            height: rowHeight,
            color: rgb(0.8, 0.8, 0.8),
        });

        headers.forEach((text, colIndex) => {
            const isNumber = /^\d+$/.test(text);
            let fontSize = 10;

            if (isNumber) {
                fontSize = 14;
            } else if (specialKeywords.some(keyword => text.includes(keyword))) {
                fontSize = 16;
            }

            const x = getCenteredTextX(tableX, text, colIndex, colWidth, customFont, fontSize);
            page.drawText(text, {
                x,
                y: tableY - 20, // Dịch xuống để tránh tràn lên lề bảng
                size: fontSize,
                font: customFont,
            });
        });

        dataTable.forEach((row, rowIndex) => {
            const rowY = tableY - (rowIndex + 1) * rowHeight - 30;

            if (rowIndex % 2 === 0) {
                page.drawRectangle({
                    x: tableX,
                    y: rowY,
                    width: colWidth * headers.length,
                    height: rowHeight,
                    color: rgb(0.95, 0.95, 0.95),
                });
            } else {
                page.drawRectangle({
                    x: tableX,
                    y: rowY,
                    width: colWidth * headers.length,
                    height: rowHeight,
                    color: rgb(1, 1, 1),
                });
            }
            row.forEach((text, colIndex) => {
                const isNumber = /^\d+$/.test(text); // Kiểm tra nếu text là số
                const isDate = /\b\d{2}\/\d{2}\/\d{4}\b|\b\d{4}-\d{2}-\d{2}\b/.test(text); // Kiểm tra định dạng ngày

                let fontSize = 10; // Mặc định
                if (isDate) {
                    fontSize = 14; // Ngày tháng lớn hơn
                } else if (isNumber) {
                    fontSize = 15
                }

                const x = getCenteredTextX(tableX, text, colIndex, colWidth, customFont, fontSize);
                const y = tableY - (rowIndex + 1) * rowHeight - 20; // Căn giữa theo chiều dọc

                page.drawText(text, {
                    x,
                    y,
                    size: fontSize,
                    font: customFont,
                });
            });
        });
    } catch (error) {
        next(error)
    }
}

module.exports = { Content_Temp }