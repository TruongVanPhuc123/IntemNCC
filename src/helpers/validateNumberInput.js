const validateNumberInput = (input, message) => {
  // Xóa khoảng trắng
  const cleaned = String(input).replace(/\s+/g, "");
  // Kiểm tra nếu cleaned không phải là một số
  if (message === "QR Code") {
    return String(cleaned);
  } else if (isNaN(cleaned) || cleaned === "") {
    throw new AppError(400, `❌ ${message} không phải số !`, "Lỗi file Excel!");
  }

  return Number(cleaned);
};

module.exports = { validateNumberInput };
