const qr = require("qrcode");

async function QRCode(soBooking, maNCC, maSieuThi, soKienNCC, soHoaDonNCC, pdfDoc, tableX, tableY, colWidth, rowHeight, page) {
    const qrText = `${soBooking}-${maNCC}-${maSieuThi}-${soKienNCC}-${soHoaDonNCC}`;

    // **Tạo QR Code & nhúng vào PDF song song**
    const qrDataUrl = await qr.toDataURL(qrText, { type: "image/png" });
    const qrEmbed = await pdfDoc.embedPng(qrDataUrl);

    // **Vị trí và kích thước QR**
    const qrWidth = 90;
    const qrHeight = 80;
    const qrX = tableX + 4.5 * colWidth + (colWidth - qrWidth) / 2;
    const qrY = tableY - 4.8 * rowHeight;

    // **Vẽ QR lên PDF**
    page.drawImage(qrEmbed, {
        x: qrX,
        y: qrY,
        width: qrWidth,
        height: qrHeight,
    });
}

module.exports = { QRCode };
