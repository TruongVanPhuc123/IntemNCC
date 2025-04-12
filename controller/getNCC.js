const Redis = require("ioredis");
const { query } = require("../connect");
const { AppError } = require("../helpers/utils");

const redis = new Redis(); // Kết nối Redis, mặc định chạy trên localhost:6379

const GetDataNCC = async (maNCC) => {
    try {
        // Kiểm tra cache Redis
        const cachedData = await redis.get(`ncc:${maNCC}`);
        if (cachedData) {
            console.log("Redis Running...")
            return JSON.parse(cachedData);
        }

        // Truy vấn database
        const data = await query("SELECT * FROM NhaCungCap WHERE MaNCC = @maNCC", maNCC, "maNCC");
        if (!data || data.length === 0) {
            throw new AppError(404, "⚠️ Không tìm thấy nhà cung cấp!", "Get data failed!");
        }

        // Cache dữ liệu với TTL là 1 giờ
        await redis.set(`ncc:${maNCC}`, JSON.stringify(data), "EX", 86400);

        return data;
    } catch (error) {
        throw new AppError(500, error.message || "Lỗi không xác định", "Query NCC Failed!");
    }
}

module.exports = { GetDataNCC };
