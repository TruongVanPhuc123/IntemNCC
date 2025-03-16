const { formatDate } = require("../middlewares/formatDate");
const { Content_Temp } = require("./contentTTemp");
const { CreateBorderLine } = require("./createBorderLine");
const { QRCode } = require("./QRCode");

async function generateStickers(quantity, pdfDoc, row, pageSize, height, width, maNCC, customFont) {
    const colCount = 6, rowCount = 5;
    const tableX = 30, rowHeight = 30;
    const colWidth = (width - 70) / colCount;

    let page = pdfDoc.addPage(pageSize);
    let promises = [];

    for (let i = 0; i < quantity; i++) {
        if (i > 0 && i % 4 === 0) page = pdfDoc.addPage(pageSize);
        const tableY = height - (i % 4) * 190 - 75;

        const headers = ["", "TEM DÁN THÙNG", "", "", "Tổng Số Kiện", "Số Booking"];
        const dataTable = [
            ["NCC:", `${Number(maNCC)}`, "NC: Trung Tam Phan Phối KCN", "", `${row["Số Kiện NCC"] || 1}`, `${row["Mã booking"] || ""}`],
            ["Số Hóa Đơn", `${row["Số Hóa Đơn NCC"] || ""}`, "ST: Co-op Mart Xa Lo Ha Noi", "", ``, ``],
            ["Siêu thị/Cửa hàng:", `${row["Mã siêu thị"] || ""}`, `QR: ${row["Mã booking"] || ""}-${maNCC}-${row["Mã siêu thị"] || ""}-${row["Số Kiện NCC"] || 1}-${row["Số Hóa Đơn NCC"] || ""}`, "", "", ""],
            ["Ngày đến TTPP:", `${formatDate(row["Ngày giao dự kiến"] || "")}`, "Hàng KM TP HSD Ngắn", "", ""],
        ];

        CreateBorderLine(rowCount, rowHeight, tableY, tableX, page, colCount, colWidth);
        Content_Temp(headers, dataTable, page, tableX, tableY, colWidth, rowHeight, customFont);

        promises.push(
            QRCode(row["Mã booking"] || "", maNCC, row["Mã siêu thị"] || "", row["Số Kiện NCC"] || 1, row["Số Hóa Đơn NCC"] || "", pdfDoc, tableX, tableY, colWidth, rowHeight, page)
        );
    }

    await Promise.all(promises);
    console.log(`✅ Tổng số tem đã tạo: ${quantity}`);
}

module.exports = { generateStickers };
