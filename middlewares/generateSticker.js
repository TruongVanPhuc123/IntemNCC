const { formatDate } = require("./formatDate");
const { Content_Temp } = require("./contentTTemp");
const { QRCode } = require("./QRCode");
const { CreateBorderLine } = require("./borderLine");

async function generateStickers(quantity, TenNCC, pdfDoc, row, pageSize, height, width, maNCC, customFont) {
    const colCount = 5, rowCount = 5;
    const tableX = 30, rowHeight = 30;
    const colWidth = (width - 70) / colCount;

    let page = pdfDoc.addPage(pageSize);
    let promises = [];

    const headers = ["NCC:", `${Number(maNCC)}`, "Tổng Số Kiện", "Số Booking", "Số Hóa Đơn"];
    const dataTable = [
        [`               ${TenNCC}`, ``, "", `${row["Mã booking"]}`, `${row["Số Hóa Đơn NCC"]}`],
        ["         Siêu thị/Cửa hàng:", `${row["Mã siêu thị"] || ""}`, `${row["Số Kiện NCC"]}`, `                     ${row["Mã booking"] || ""}-${maNCC}-${row["Mã siêu thị"] || ""}-${row["Số Kiện NCC"] || 1}-${row["Số Hóa Đơn NCC"] || ""}`, ""],
        ["                    Coop Mart TP.HoChiMinh", "", "", "", ""],
        ["   Ngày đến TTPP:", `${formatDate(row["Ngày giao dự kiến"] || "")}`, "          Hàng KM TP HSD Ngắn", "", ""],
    ];

    for (let i = 0; i < quantity; i++) {
        if (i > 0 && i % 4 === 0) page = pdfDoc.addPage(pageSize);
        const tableY = height - (i % 4) * 190 - 75;

        CreateBorderLine(rowCount, rowHeight, tableY, tableX, page, colCount, colWidth)
        Content_Temp(headers, dataTable, page, tableX, tableY, colWidth, rowHeight, customFont)
        promises.push(
            QRCode(row["Mã booking"] || "", maNCC, row["Mã siêu thị"] || "", row["Số Kiện NCC"] || 1, row["Số Hóa Đơn NCC"] || "",
                pdfDoc, tableX, tableY, colWidth, rowHeight, page)
        );
    }

    await Promise.all(promises);
    console.log(`✅ Tổng số tem đã tạo: ${quantity}`);
}

module.exports = { generateStickers };
