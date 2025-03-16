async function dowloadPDFFile(pdfDoc, res) {
    pdfDoc
        .save()
        .then((pdfBytes) => {
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", 'attachment; filename="output.pdf"');
            res.end(pdfBytes);
        })
        .catch((error) => {
            console.error("❌ Lỗi tạo file PDF:", error);
            if (!res.headersSent) {
                res.status(500).send("Lỗi khi tạo file PDF!");
            }
        });
}

module.exports = { dowloadPDFFile };
