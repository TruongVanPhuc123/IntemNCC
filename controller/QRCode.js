const qr = require('qrcode');

async function QRCode(soBooking, maNCC, maSieuThi, soKienNCC, soHoaDonNCC, pdfDoc, tableX, tableY, colWidth, rowHeight, page, next) {
    try {
        const qrText = `${soBooking}-${maNCC}-${maSieuThi}-${soKienNCC}-${soHoaDonNCC}`;
        const qrImage = await qr.toBuffer(qrText, { type: 'png' });
        const qrEmbed = await pdfDoc.embedPng(qrImage);

        const qrWidth = 90; //Độ rộng QR 
        const qrHeight = 80; //Độ cao QR
        const qrX = tableX + 4.5 * colWidth + (colWidth - qrWidth) / 2; //Trái - phải
        const qrY = tableY - 4.8 * rowHeight; //Lên - xuống


        page.drawImage(qrEmbed, {
            x: qrX,
            y: qrY,
            width: qrWidth,
            height: qrHeight,
        });
    } catch (error) {
        next(error)
    }
}

module.exports = { QRCode }