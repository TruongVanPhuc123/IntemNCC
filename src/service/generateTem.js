const { AppError } = require("../helpers/utils");
const { dataTemContent } = require("./dataTemContent");
const { handleCreateTem } = require("./handleCreateTem");
const { GetStore } = require("../database/getStore");
const { styleText } = require("node:util");

const generateTem = async (
  quantity,
  TenNCC,
  pdfDoc,
  row,
  pageSize,
  width,
  height,
  maNCC,
  customFont,
  page,
  stickerOnPage,
  totalQuantity
) => {
  try {
    const maStore = Number(row["Mã siêu thị"]);
    const soKien = Number(row["Số Kiện NCC"]);
    const soHoaDon = row["Số Hóa Đơn NCC"];
    const maBooking = row["Mã booking"];
    const ngayGiao = row["Ngày giao dự kiến"];

    if (!maBooking)
      throw new AppError(404, "🏷️ Thiếu Mã Booking!", "Lỗi tạo tem");
    if (!ngayGiao)
      throw new AppError(404, "🚚 Thiếu Ngày Giao Dự Kiến!", "Lỗi tạo tem");
    if (isNaN(soKien))
      throw new AppError(404, "📦 Thiếu Số Kiện!", "Lỗi tạo tem");
    if (!maStore || isNaN(maStore))
      throw new AppError(404, "🏷️ Thiếu Mã Siêu Thị!", "Lỗi tạo tem");
    if (!soHoaDon)
      throw new AppError(404, "📦 Thiếu Số Hóa Đơn!", "Lỗi tạo tem");

    const result = await GetStore(maStore);
    const { headers, dataTable } = dataTemContent(row, maNCC, TenNCC, result);

    // --- In tem
    const res = await handleCreateTem({
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
    });

    return res;
  } catch (error) {
    throw new AppError(404, error.message, "❌ Đã xảy ra lỗi khi in tem");
  }
};

module.exports = { generateTem };
