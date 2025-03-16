const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");
const { AppError, catchAsync } = require("../helpers/utils");
const fontkit = require("@pdf-lib/fontkit");
const { readExcelWithUTF8 } = require("../middlewares/readExcelFile");
const { GetDataNCC } = require("../controller/getNCC");
const { dowloadPDFFile } = require("../middlewares/dowloadPDF_File");
const { generateStickers } = require("../controller/generateSticker");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Đọc file từ RAM
const fontPath = path.join(__dirname, "../fonts/Roboto-Italic-VariableFont_wdth,wght.ttf");
const fontBytes = fs.readFileSync(fontPath); // Đọc font **chỉ 1 lần** khi server khởi động

router.post(
  "/upload/:maNCC",
  upload.single("file"),
  catchAsync(async (req, res, next) => {
    const { maNCC } = req.params;
    if (!maNCC) return next(new AppError(400, "⚠️ Vui lòng nhập mã nhà cung cấp!", "Lỗi tải lên!"));
    if (!req.file) return next(new AppError(400, "⚠️ Vui lòng tải lên file Excel!", "Lỗi tải lên!"));

    // **Đọc dữ liệu từ file Excel**
    const data = readExcelWithUTF8(req.file.buffer);
    if (!data.length) return next(new AppError(404, "⚠️ File Excel không có dữ liệu!", "Lỗi tải lên!"));

    try {
      const pageSize = [595, 842]; // A4
      const { width, height } = { width: pageSize[0], height: pageSize[1] };

      // **Tạo PDF**
      const pdfDoc = await PDFDocument.create();
      pdfDoc.registerFontkit(fontkit);
      const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });

      // **Lấy thông tin nhà cung cấp (chỉ gọi 1 lần)**
      const DataNCC = await GetDataNCC(maNCC, next);
      const StatusNCC = DataNCC?.StatusNCC === 1;
      const SoLuongTem = DataNCC?.SoLuongTem || 1;

      // **Xử lý song song tất cả hàng trong Excel**
      await Promise.all(
        data.map((row) =>
          generateStickers(StatusNCC ? SoLuongTem : Number(row["Số Kiện NCC"]), pdfDoc, row, pageSize, height, width, maNCC, customFont)
        )
      );

      // **Gửi file PDF về client**
      dowloadPDFFile(pdfDoc, res);
    } catch (error) {
      next(new AppError(500, error.message, "Lỗi hệ thống ❌"));
    }
  })
);

module.exports = router;
