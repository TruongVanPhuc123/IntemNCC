const { getCenteredTextX } = require("./centerText");
const { rgb } = require("pdf-lib");

async function Content_Temp(headers, dataTable, page, tableX, tableY, colWidth, rowHeight, customFont) {
    const specialKeywords = new Set(["TEM DÁN THÙNG"]);

    // **Vẽ header chỉ 1 lần**
    page.drawRectangle({
        x: tableX,
        y: tableY - rowHeight,
        width: colWidth * headers.length,
        height: rowHeight,
        color: rgb(0.8, 0.8, 0.8),
    });

    headers.forEach((text, colIndex) => {
        let fontSize = 10;
        if (/^\d+$/.test(text)) {
            fontSize = 14;
        } else if (specialKeywords.has(text)) {
            fontSize = 16;
        }

        page.drawText(text, {
            x: getCenteredTextX(tableX, text, colIndex, colWidth, customFont, fontSize),
            y: tableY - 20,
            size: fontSize,
            font: customFont,
        });
    });

    // **Vẽ nội dung bảng**
    dataTable.forEach((row, rowIndex) => {
        const rowY = tableY - (rowIndex + 1) * rowHeight - 30;

        // **Tô nền xen kẽ chỉ khi cần**
        if (rowIndex % 2 === 0) {
            page.drawRectangle({
                x: tableX,
                y: rowY,
                width: colWidth * headers.length,
                height: rowHeight,
                color: rgb(0.95, 0.95, 0.95),
            });
        }

        row.forEach((text, colIndex) => {
            let fontSize = 10;
            if (/\b\d{2}\/\d{2}\/\d{4}\b|\b\d{4}-\d{2}-\d{2}\b/.test(text)) {
                fontSize = 14;
            } else if (/^\d+$/.test(text)) {
                fontSize = 15;
            }

            page.drawText(text, {
                x: getCenteredTextX(tableX, text, colIndex, colWidth, customFont, fontSize),
                y: rowY + 10,
                size: fontSize,
                font: customFont,
            });
        });
    });

}

module.exports = { Content_Temp };
