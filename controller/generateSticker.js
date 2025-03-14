const { formatDate } = require("../middlewares/formatDate");
const { Content_Temp } = require("./contentTTemp");
const { CreateBorderLine } = require("./createBorderLine");
const { QRCode } = require("./QRCode");

async function generateStickers(soLuong, pdfDoc, row, pageSize, height, width, maNCC, customFont) {
    // **Lấy dữ liệu từ Excel**
    const soBooking = row["Mã booking"] || "";
    const ngayGiaoDuKien = row["Ngày giao dự kiến"] || "";
    const soKienNCC = Number(row["Số Kiện NCC"]) || 1;
    const soHoaDonNCC = row["Số Hóa Đơn NCC"] || "";
    const maSieuThi = row["Mã siêu thị"] || "";

    const colCount = 6; // Số cột
    const rowCount = 5; // Số hàng
    const tableX = 30; // Lề trái 
    let page;

    for (let i = 0; i < soLuong; i++) {
        if (i % 4 === 0) {
            page = pdfDoc.addPage(pageSize);
        }

        const tableY = height - (i % 4) * 170 - 75;
        const colWidth = (width - 70) / colCount;
        const rowHeight = 30;

        const headers = ["", "TEM DÁN THÙNG", "", "", "Tổng Số Kiện", "Số Booking"];
        const dataTable = [
            ["NCC:", `${Number(maNCC)}`, "NC: Trung Tam Phan Phối KCN", "", `${soKienNCC}`, `${soBooking}`],
            ["Số Hóa Đơn", `${soHoaDonNCC}`, "ST: Co-op Mart Xa Lo Ha Noi", "", ``, ``],
            ["Siêu thị/Cửa hàng:", `${maSieuThi}`, `QR: ${soBooking}-${maNCC}-${maSieuThi}-${soKienNCC}-${soHoaDonNCC}`, "", "", ""],
            ["Ngày đến TTPP:", `${formatDate(ngayGiaoDuKien)}`, "Hàng KM TP HSD Ngắn", "", ""],
        ];

        CreateBorderLine(rowCount, rowHeight, tableY, tableX, page, colCount, colWidth);
        Content_Temp(headers, dataTable, page, tableX, tableY, colWidth, rowHeight, customFont);
        await QRCode(soBooking, maNCC, maSieuThi, soKienNCC, soHoaDonNCC, pdfDoc, tableX, tableY, colWidth, rowHeight, page);
    }
}

module.exports = { generateStickers }
