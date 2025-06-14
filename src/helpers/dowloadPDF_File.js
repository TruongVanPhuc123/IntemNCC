const stream = require("stream");

async function downloadPDFFile(pdfDoc, res) {
    try {
        const pdfBytes = await pdfDoc.save(); // Lưu PDF vào bộ nhớ (không cần chờ toàn bộ file)

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="output.pdf"');

        const pdfStream = new stream.PassThrough();
        pdfStream.end(pdfBytes); // Đưa dữ liệu vào stream

        pdfStream.pipe(res); // Gửi dữ liệu về client theo từng phần
        pdfStream.on("error", (err) => {
            if (!res.headersSent) res.status(500).send("Lỗi khi tải file PDF!");
            throw new AppError(500, "Lỗi stream PDF!", err.message);
        });

    } catch (error) {
        if (!res.headersSent) res.status(500).send("Lỗi khi tạo file PDF!");
        throw new AppError(500, "Lỗi khi tạo file PDF!", error.message);
    }
}

module.exports = { downloadPDFFile };
