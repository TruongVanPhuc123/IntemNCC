const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
});

function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString; // Nếu không hợp lệ, trả về nguyên bản

    // 👉 Cộng thêm 1 ngày
    date.setDate(date.getDate() + 1);

    return dateFormatter.format(date);
}

module.exports = { formatDate };
