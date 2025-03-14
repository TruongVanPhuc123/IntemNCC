//**Hàm căn giữa */
function getCenteredTextX(tableX, text, colIndex, colWidth, font, fontSize) {
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const specialKeywords = ["QR:", "ST:", "NC:"];

    switch (text) {
        case "Hàng KM TP HSD Ngắn":
            return tableX + colIndex * colWidth + (colWidth - textWidth) / 2 + 25;
        case "Siêu thị/Cửa hàng:":
            return tableX + colIndex * colWidth + (colWidth - textWidth) / 2 + 5;
        case "TEM DÁN THÙNG":
            return tableX + colIndex * colWidth + (colWidth - textWidth) / 2 + 20; // Qua phải 40 đơn vị
        default:
            if (specialKeywords.some(keyword => text.includes(keyword))) {
                return tableX + colIndex * colWidth + (colWidth - textWidth) / 2 + 35;
            }
            return tableX + colIndex * colWidth + (colWidth - textWidth) / 2;
    }
}

module.exports = { getCenteredTextX }