const { QRCode } = require("../content/QRCode");
const { Content_Tem } = require("../content/contentTem");
const { CreateBorderLine } = require("../content/borderLine");

async function handleCreateTem({
  quantity,
  pdfDoc,
  pageSize,
  height,
  width,
  maBooking,
  maNCC,
  maStore,
  soKien,
  soHoaDon,
  headers,
  dataTable,
  customFont,
  page,
  stickerOnPage,
}) {
  const colCount = 5;
  const rowCount = 5;
  const marginX = 40;
  const tableX = marginX;
  const rowHeight = 32;
  const colWidth = (width - marginX * 2) / colCount;

  for (let i = 0; i < quantity; i++) {
    if (stickerOnPage >= 4 || !page) {
      page = pdfDoc.addPage(pageSize);
      stickerOnPage = 0;
    }

    const tableY = height - stickerOnPage * 190 - 75;

    await QRCode(
      maBooking,
      maNCC,
      maStore,
      soKien,
      soHoaDon,
      pdfDoc,
      tableX,
      tableY,
      colWidth,
      rowHeight,
      page
    );

    CreateBorderLine(
      rowCount,
      rowHeight,
      tableY,
      tableX,
      page,
      colCount,
      colWidth
    );

    Content_Tem(
      headers,
      dataTable,
      page,
      tableX,
      tableY,
      colWidth,
      rowHeight,
      customFont
    );

    stickerOnPage++;
  }

  return { page, stickerOnPage };
}

module.exports = { handleCreateTem };
