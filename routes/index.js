const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const { AppError, catchAsync } = require("../helpers/utils");
const fontkit = require("@pdf-lib/fontkit");
const { readExcelWithUTF8 } = require('../middlewares/readExcelFile');
const { GetDataNCC } = require('../controller/getNCC');
const { dowloadPDFFile } = require('../middlewares/dowloadPDF_File');
const { generateStickers } = require('../controller/generateSticker');
const router = express.Router();

const upload = multer({ dest: "uploads/" });
const fontPath = path.join(__dirname, "../fonts/Roboto-Italic-VariableFont_wdth,wght.ttf");
const fontBytes = fs.readFileSync(fontPath);

/* POST */
router.post("/upload/:maNCC", upload.single("file"), catchAsync(async (req, res, next) => {
  const { maNCC } = req.params
  if (!maNCC) throw new AppError(400, "⚠️ Vui lòng nhập mã nhà cung cấp!", "Lỗi tải lên!")

  if (!req.file) throw new AppError(400, "⚠️ Vui lòng tải lên file Excel!", "Lỗi tải lên!");

  // **Đọc file Excel**
  const data = readExcelWithUTF8(req.file.path);
  if (data.length === 0) throw new AppError(404, "⚠️ File Excel không có dữ liệu!", "Lỗi tải lên!");

  try {
    const pageSize = [595, 842]; // A4
    const { width, height } = { width: pageSize[0], height: pageSize[1] };

    // **Tạo file PDF**
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });

    //Query Sql
    const DataNCC = await GetDataNCC(maNCC, next);

    for (let i = 0; i < data.length; i++) { // Vòng lặp 1: lấy tất cả hàng trong excel file
      const row = data[i];

      // Gọi hàm
      if (DataNCC.StatusNCC === 1) {
        await generateStickers(DataNCC.SoLuongTem, pdfDoc, row, pageSize, height, width, maNCC, customFont);
      } else {
        await generateStickers(Number(row["Số Kiện NCC"]), pdfDoc, row, pageSize, height, width, maNCC, customFont);
      }
    }
    //**Xử lý trả File PDF về Client */
    await dowloadPDFFile(pdfDoc, path, req, res);

  } catch (error) {
    throw new AppError(500, error.message, "Lỗi hệ thống ❌");
  }
}));



module.exports = router;
