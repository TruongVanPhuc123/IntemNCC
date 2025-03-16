//**Hàm căn giữa */
function getCenteredTextX(tableX, text, colIndex, colWidth, font, fontSize) {
    const textWidth = font.widthOfTextAtSize(text, fontSize);

    // **Map lưu giá trị dịch chuyển (tăng tốc lookup)**
    const offsetMap = new Map([
        ["Hàng KM TP HSD Ngắn", 25],
        ["Siêu thị/Cửa hàng:", 5],
        ["TEM DÁN THÙNG", 20]
    ]);

    // **Các tiền tố cần dịch chuyển**
    const specialPrefixes = ["QR:", "ST:", "NC:"];

    let offset = offsetMap.get(text) || 0;
    if (!offset && specialPrefixes.some(prefix => text.startsWith(prefix))) {
        offset = 35;
    }

    return tableX + colIndex * colWidth + (colWidth - textWidth) / 2 + offset;
}

module.exports = { getCenteredTextX };
