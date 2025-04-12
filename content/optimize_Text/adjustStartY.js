const adjustStartY = (rowIndex, colIndex, baseY, rowHeight, totalTextHeight, lineHeight, lines) => {
    let startY = baseY + (rowHeight - totalTextHeight) / 2 + lineHeight * 0.1;

    if (rowIndex === 0 && colIndex === 0 && lines.length > 1) return startY + 8; // dịch TenNCC lên 8pt nếu số dòng > 1
    if (rowIndex === 3 && colIndex === 2) return startY + 8; // dịch Hang KM HSD Ngan lên 8pt
    if (rowIndex === 1 && colIndex === 3) return startY + 12; // dịch QrText lên 12pt
    if (rowIndex === 1 && colIndex === 2) return startY - 10; // dịch Số Kiện xuống 10pt
    return startY;
}

module.exports = { adjustStartY };
