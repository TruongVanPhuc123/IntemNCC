const xlsx = require("xlsx");
const { formatDate } = require("./formatDate");

function processExcel(fileBuffer, userStatus, SoLuongTem) {
    const workbook = xlsx.read(fileBuffer, { type: "buffer", cellText: false, cellDates: true });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    let data = xlsx.utils.sheet_to_json(sheet);

    data = data.map(row => {
        return {
            Ma_Booking: row["Mã booking"],
            Ma_SieuThi: row["Mã siêu thị"],
            Ngay_Giao: formatDate(row["Ngày giao dự kiến"]),
            So_Kien: row["Số Kiện NCC"],
            So_HoaDon: row["Số Hóa Đơn NCC"],
            So_Tem_In: userStatus === 1 ? SoLuongTem : row["Số Kiện NCC"]
        }
    })


    // Tạo file Excel mới
    const newWorkbook = xlsx.utils.book_new();
    const newSheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(newWorkbook, newSheet, "Sheet1");

    // Ghi file Excel vào buffer
    const excelBuffer = xlsx.write(newWorkbook, { type: "buffer", bookType: "xlsx" });

    console.log("Excel file created successfully!");
    return excelBuffer;

}

module.exports = { processExcel };
