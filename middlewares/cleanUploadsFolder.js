const fs = require("fs");
const path = require("path");

function cleanUploadsFolder() {
    const uploadDir = path.join(__dirname, "../uploads");

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error("Lỗi đọc thư mục:", err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(uploadDir, file);
            fs.unlink(filePath, (err) => {
                // if (err) {
                //     console.error(`Lỗi xóa file ${file}:`, err);
                // }
            });
        });
    });
}
