const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
});

// Bộ nhớ đệm để lưu kết quả đã format
const dateCache = new Map();

function formatDate(dateString) {
    if (dateCache.has(dateString)) {
        return dateCache.get(dateString);
    }

    const date = new Date(dateString);
    if (isNaN(date)) return dateString; // Nếu không hợp lệ, trả về nguyên bản

    const formattedDate = dateFormatter.format(date);
    dateCache.set(dateString, formattedDate); // Lưu vào cache

    return formattedDate;
}

module.exports = { formatDate };
