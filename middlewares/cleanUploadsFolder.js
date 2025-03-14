const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

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

// Lên lịch chạy mỗi ngày lúc 22:00
cron.schedule("0 22 * * *", () => {
    console.log("🕙 Đang chạy cleanUploadsFolder...");
    cleanUploadsFolder();
});
