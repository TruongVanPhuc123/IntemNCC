const qr = require("qrcode");

const QRCode = async (
  soBooking,
  maNCC,
  maSieuThi,
  soKienNCC,
  soHoaDonNCC,
  pdfDoc,
  tableX,
  tableY,
  colWidth,
  rowHeight,
  page
) => {
  const qrText = `${soBooking}-${maNCC}-${maSieuThi}-${soKienNCC}-${soHoaDonNCC}`;

  // **Tạo QR Code & nhúng vào PDF song song**
  const qrDataUrl = await qr.toDataURL(qrText, { type: "image/png" });
  const qrEmbed = await pdfDoc.embedPng(qrDataUrl);

  // **Vị trí và kích thước QR**
  const qrWidth = 110;
  const qrHeight = 100;
  const qrX = tableX + 3.5 * colWidth + (colWidth - qrWidth) / 2; // Căn giữa
  const qrY = tableY - 4.9 * rowHeight; //Số lớn thì lên - nhỏ xuống

  // **Vẽ QR lên PDF**
  page.drawImage(qrEmbed, {
    x: qrX,
    y: qrY,
    width: qrWidth,
    height: qrHeight,
  });
};

module.exports = { QRCode };
