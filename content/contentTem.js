const { adjustStartY } = require("./optimize_Text/adjustStartY");
const { getFontSize } = require("./optimize_Text/getFontSize");
const { getTextX } = require("./optimize_Text/getTextX");
const { wrapText } = require("./optimize_Text/wrapText");

const Content_Tem = (
  headers,
  dataTable,
  page,
  tableX,
  tableY,
  colWidth,
  rowHeight,
  customFont
) => {
  const fontSize = 14;

  headers.forEach((text, colIndex) => {
    const textY = tableY - 20; // chiều dọc
    let textX; // chiều ngang

    if (colIndex === 1 || colIndex === 2 || colIndex === 3 || colIndex === 4) {
      // 👇 Tính chiều rộng văn bản
      const textWidth = customFont.widthOfTextAtSize(text, fontSize);
      textX = tableX + colIndex * colWidth + (colWidth - textWidth) / 2; // Căn giữa cột 2, 3, 4, 5
    } else {
      textX = tableX + colIndex * colWidth + 5; // Căn trái mặc định
    }

    page.drawText(text, {
      x: textX, // chiều ngang
      y: textY, // chiều dọc
      size: fontSize,
      font: customFont,
    });
  });

  dataTable.forEach((row, rowIndex) => {
    const baseY = tableY - (rowIndex + 1) * rowHeight - 30; // vị trí text trong dataTable dịch xuống 30 pt

    row.forEach((text, colIndex) => {
      const initialFontSize = getFontSize(rowIndex, colIndex); // Lấy kích thước font theo nội dung
      const isMerged = colIndex === 0; // Điều chỉnh cho phép colIndex 0 chiếm khoảng trống
      const effectiveColWidth = isMerged ? colWidth * 2 : colWidth;

      const paddingX = 5;
      const paddingY = 4;
      const effectiveWidth = effectiveColWidth - paddingX * 2;
      const effectiveHeight = rowHeight - paddingY * 2;

      let fontSize = initialFontSize;
      let lines = wrapText(
        text.toString(),
        customFont,
        fontSize,
        effectiveWidth
      ); // Lấy dòng text
      let lineHeight = fontSize * 1.1;
      let totalTextHeight = lines.length * lineHeight;

      // 👇 Nếu vượt quá chiều cao thì thu nhỏ lại
      while (totalTextHeight > effectiveHeight && fontSize > 6) {
        fontSize -= 0.5;
        lineHeight = fontSize * 1.1;
        lines = wrapText(text.toString(), customFont, fontSize, effectiveWidth);
        totalTextHeight = lines.length * lineHeight;
      }

      let startY = adjustStartY(
        rowIndex,
        colIndex,
        baseY,
        rowHeight,
        totalTextHeight,
        lineHeight,
        lines
      ); // chỉnh vị trí textX (chiều dọc)

      if (rowIndex === 1 && colIndex === 2) fontSize = 40; // Số Kiện

      lines.forEach((line, i) => {
        const textWidth = customFont.widthOfTextAtSize(line, fontSize); //lấy dộ rộng của chữ
        const textY = startY - i * fontSize;
        let textX = getTextX(
          rowIndex,
          colIndex,
          tableX,
          colWidth,
          effectiveColWidth,
          textWidth,
          paddingX
        ); // căn vị trí textY (chiều ngang)

        page.drawText(line, {
          x: textX, // chiều ngang
          y: textY, // chiều dọc
          size: fontSize,
          font: customFont,
        });
      });
    });
  });
};

module.exports = { Content_Tem };
