const { AppError, catchAsync } = require("../helpers/utils");
const { GetDataNCC } = require("../middlewares/getNCC");
const { processExcel } = require('../middlewares/processExcel')
const fs = require("fs");



const generateExcelFile = catchAsync(async (req, res, next) => {
    const { maNCC } = req.params;
    if (!maNCC) throw new AppError(400, "⚠️ Vui lòng nhập mã nhà cung cấp!", "Lỗi tải lên!");
    if (!req.file) throw new AppError(400, "⚠️ Vui lòng tải lên file Excel!", "Lỗi tải lên!");

    try {
        // **Lấy thông tin nhà cung cấp (chỉ gọi 1 lần)**
        const DataNCC = await GetDataNCC(maNCC);
        const userStatus = DataNCC?.StatusNCC;
        const SoLuongTem = DataNCC?.SoLuongTem;
        const fileBuffer = req.file.buffer;

        const excelBuffer = processExcel(fileBuffer, userStatus, SoLuongTem);

        // Gửi file Excel về client
        // res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        // res.setHeader("Content-Disposition", 'attachment; filename="processed.xlsx"');
        // res.send(excelBuffer);




    } catch (error) {
        throw new AppError(500, error.message, "Lỗi hệ thống ❌");
    }
})

module.exports = { generateExcelFile }