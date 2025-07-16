const { formatDate } = require("../helpers/formatDate");
const { validateNumberInput } = require("../helpers/validateNumberInput");

function dataTemContent(row, maNCC, TenNCC, result) {
  const maStore = Number(row["Mã siêu thị"]);
  const soKien = Number(row["Số Kiện NCC"]);
  const soHoaDon = row["Số Hóa Đơn NCC"];
  const maBooking = row["Mã booking"];
  const ngayGiao = row["Ngày giao dự kiến"];
  const qrCodeText = `${maBooking}-${maNCC}-${maStore}-${soKien}-${soHoaDon}`;

  const headers = [
    "NCC:",
    `${validateNumberInput(maNCC, "Mã nhà cung cấp")}`,
    "Tổng Số Kiện",
    "Số Booking",
    "Số Hóa Đơn",
  ];
  const dataTable = [
    [
      `${TenNCC}`,
      ``,
      "",
      `${validateNumberInput(maBooking, "Mã booking")}`,
      `${soHoaDon}`,
    ],
    [
      "Siêu thị/Cửa hàng:",
      `    ${validateNumberInput(maStore, "Mã siêu thị")}`,
      `${validateNumberInput(soKien, "Số kiện NCC")}`,
      "",
      "",
    ],
    [`${result?.TenStore.trim()}`, "", "", "", ""],
    [
      "Ngày đến TTPP:",
      `${formatDate(ngayGiao)}`,
      "Hàng KM TP HSD Ngắn",
      `${validateNumberInput(qrCodeText, "QR Code")}`,
      "",
    ],
  ];

  return { headers, dataTable, qrCodeText };
}

module.exports = { dataTemContent };
