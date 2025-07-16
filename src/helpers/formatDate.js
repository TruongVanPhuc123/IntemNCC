const { AppError } = require("./utils");

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString; // Nếu không hợp lệ, trả về nguyên bản

    // 👉 Cộng thêm 1 ngày
    date.setDate(date.getDate() + 1);

    return dateFormatter.format(date);
  } catch (error) {
    throw new AppError(
      400,
      "Lỗi định dạng ngày, sử dụng định dạng dd/mm/yyyy",
      "Lỗi tạo tem"
    );
  }
}

module.exports = { formatDate };
