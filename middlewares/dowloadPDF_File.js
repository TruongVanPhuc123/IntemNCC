const fs = require("fs");

async function dowloadPDFFile(pdfDoc, path, res) {
    const pdfBytes = await pdfDoc.save();
    const pdfPath = path.join(__dirname, "../uploads/output.pdf");
    fs.writeFileSync(pdfPath, pdfBytes, { encoding: "binary" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="output.pdf"');
    res.end(pdfBytes);

}

module.exports = { dowloadPDFFile }
