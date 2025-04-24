const { formatDate } = require("../helpers/formatDate");
const { Content_Tem } = require("../content/contentTem");
const { QRCode } = require("../content/QRCode");
const { CreateBorderLine } = require("../content/borderLine");
const { GetStore } = require("../controller/GetStore");
const { AppError } = require("../helpers/utils");
const { genrateErrorTem } = require("./genrateErrorTem");

const generateTem = async (quantity, TenNCC, pdfDoc, row, pageSize, height, width, maNCC, customFont, page, stickerOnPage, next) => {
    const colCount = 5;
    const rowCount = 5;
    const marginX = 40;
    const tableX = marginX;
    const rowHeight = 32;
    const colWidth = (width - marginX * 2) / colCount;

    const maStore = row["Mã siêu thị"];
    const soKien = Number(row["Số Kiện NCC"]);
    const soHoaDon = row["Số Hóa Đơn NCC"];
    const maBooking = row["Mã booking"];
    const ngayGiao = row["Ngày giao dự kiến"];
    const qrCodeText = `${maBooking}-${maNCC}-${maStore}-${soKien}-${soHoaDon}`;

    if (!maBooking) throw new AppError(404, "📦 Thiếu Mã Booking!", "Lỗi tạo tem")
    if (!ngayGiao) throw new AppError(404, "🏷️ Thiếu Ngày Giao Dự Kiến!", "Lỗi tạo tem")
    if (soKien === NaN) throw new AppError(404, "📦 Thiếu Số Kiện!", "Lỗi tạo tem")
    if (!soHoaDon) throw new AppError(404, "📦 Thiếu Số Hóa Đơn!", "Lỗi tạo tem")

    try {
        console.log(`\n==============================`);
        console.log(`🏷️   MÃ NHÀ CUNG CẤP = ${maNCC}`);
        console.log(`🔍 Nhận vào maStore = ${maStore}`);

        const result = await GetStore(maStore);
        console.log("📦 Lấy từ Redis cache");

        const headers = ["NCC:", `${Number(maNCC)}`, "Tổng Số Kiện", "Số Booking", "Số Hóa Đơn"];
        const dataTable = [
            [`${TenNCC}`, ``, "", `${maBooking}`, `${soHoaDon}`],
            ["Siêu thị/Cửa hàng:", `    ${maStore}`, `${soKien}`, `${qrCodeText}`, ""],
            [`${result?.TenStore.trim()}`, "", "", "", ""],
            ["Ngày đến TTPP:", `${formatDate(ngayGiao)}`, "Hàng KM TP HSD Ngắn", "", ""],
        ];

        console.log(`📄 Tổng số tem cần tạo: ${quantity}`);

        for (let i = 0; i < quantity; i++) {
            if (stickerOnPage >= 4 || !page) {
                page = pdfDoc.addPage(pageSize);
                stickerOnPage = 0;
            }

            const tableY = height - stickerOnPage * 190 - 75;

            CreateBorderLine(rowCount, rowHeight, tableY, tableX, page, colCount, colWidth);
            Content_Tem(headers, dataTable, page, tableX, tableY, colWidth, rowHeight, customFont);
            await QRCode(maBooking, maNCC, maStore, soKien, soHoaDon, pdfDoc, tableX, tableY, colWidth, rowHeight, page);

            stickerOnPage++;
        }

        console.log(`✅ ĐÃ HOÀN THÀNH: ${quantity} tem`);
        console.log(`==============================\n`);
    } catch (error) {
        genrateErrorTem(maStore, maBooking, maNCC, error);
        console.log(error.message)
        throw new AppError(404, error.message, "❌ Đã xảy ra lỗi khi in tem");
    }

    return { page, stickerOnPage };
};

module.exports = { generateTem };
