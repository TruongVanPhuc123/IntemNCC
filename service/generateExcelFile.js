const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const fontkit = require("@pdf-lib/fontkit");

const { AppError, catchAsync } = require("../helpers/utils");
const { processExcel } = require("../middlewares/processExcel");
const { GetDataNCC } = require("../controller/getNCC");
const { downloadPDFFile } = require("../helpers/dowloadPDF_File");
const { generateTem } = require("./generateTem");

const fontPath = path.join(
  __dirname,
  "../fonts/Roboto-Italic-VariableFont_wdth,wght.ttf"
);
const fontBytes = fs.readFileSync(fontPath); // Đọc font một lần khi khởi động

const generateExcelFile = catchAsync(async (req, res, next) => {
  const { maNCC } = req.params;
  const excelBuffer = req.file?.buffer;

  // Validate đầu vào
  if (!maNCC)
    throw new AppError(
      400,
      "⚠️ Vui lòng nhập mã nhà cung cấp!",
      "Lỗi tải lên!"
    );
  if (!excelBuffer)
    throw new AppError(400, "⚠️ Vui lòng tải lên file Excel!", "Lỗi tải lên!");

  const data = processExcel(excelBuffer);
  if (!data.length)
    throw new AppError(404, "⚠️ File Excel không có dữ liệu!", "Lỗi tải lên!");

  try {
    // Setup PDF
    const pageSize = [595, 842]; // A4
    const [width, height] = pageSize;
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });

    // Thông tin NCC
    const { TenNCC, SoLuongTem, Status } = await GetDataNCC(maNCC);
    let page = null;
    let stickerOnPage = 0;

    // Tạo tem
    for (const row of data) {
      const soKien = Number(row["Số Kiện NCC"]);
      const quantity = soKien === 0 ? 1 : Status === 1 ? SoLuongTem : soKien;

      ({ page, stickerOnPage } = await generateTem(
        quantity,
        TenNCC,
        pdfDoc,
        row,
        pageSize,
        height,
        width,
        maNCC,
        customFont,
        page,
        stickerOnPage
      ));
    }

    // Tải file
    downloadPDFFile(pdfDoc, res);
  } catch (error) {
    throw new AppError(400, error.message, "Lỗi tạo tem ❌");
  }
});

module.exports = { generateExcelFile };
