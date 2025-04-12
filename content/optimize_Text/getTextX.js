const getTextX = (rowIndex, colIndex, tableX, colWidth, effectiveColWidth, textWidth, paddingX) => {
    const baseX = tableX + colIndex * colWidth;

    if (rowIndex === 1 && colIndex === 3) return baseX + 37; // QrText căn phải 37pt
    if (colIndex === 0 && rowIndex === 0) return baseX + (effectiveColWidth - textWidth) / 2; // TenNCC căn giữa ngang
    if (colIndex === 0) return baseX + paddingX;

    return baseX + (colWidth - textWidth) / 2; // Căn giữa
}

module.exports = { getTextX };
