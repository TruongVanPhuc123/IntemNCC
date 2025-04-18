const getTextX = (rowIndex, colIndex, tableX, colWidth, effectiveColWidth, textWidth, paddingX) => {
    const baseX = tableX + colIndex * colWidth;

    if (colIndex === 0 && rowIndex === 0) return baseX + (effectiveColWidth - textWidth) / 2; // TenNCC căn giữa ngang
    if (colIndex === 3 && rowIndex === 1) return baseX + 38; // QrText căn phai 38pt
    if (colIndex === 0 && rowIndex === 2) return baseX + (effectiveColWidth - textWidth) / 2; // Ten Store căn giữa ngang
    if (colIndex === 0) return baseX + paddingX;

    return baseX + (colWidth - textWidth) / 2; // Căn giữa
}

module.exports = { getTextX };
