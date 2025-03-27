//**Hàm căn giữa */
function centerText(tableX, text, colIndex, colWidth, font, fontSize) {
    const textWidth = font.widthOfTextAtSize(text, fontSize);

    return tableX + colIndex * colWidth + (colWidth - textWidth) / 2;
}

module.exports = { centerText };
