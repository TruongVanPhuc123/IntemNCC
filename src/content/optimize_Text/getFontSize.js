const getFontSize = (rowIndex, colIndex) => {
    if (rowIndex === 0 && colIndex === 0) return 14.5;
    if (rowIndex === 1 && colIndex === 0) return 12; // Siêu thị/Cửa hàng
    if (rowIndex === 1 && colIndex === 1) return 30; // Ma Store
    if (rowIndex === 2 && colIndex === 0) return 20; // Tên Store
    if (rowIndex === 3 && colIndex === 1) return 17; // Ngày giao
    return 14;
}

module.exports = { getFontSize }