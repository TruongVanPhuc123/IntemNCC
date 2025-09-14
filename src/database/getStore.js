const Redis = require("ioredis");
const { query } = require("../connect");
const { AppError } = require("../helpers/utils");

const redis = new Redis(); // Kết nối Redis, mặc định localhost:6379

const GetStore = async (maStore, forceQuery = false) => {
  let pool;
  try {
    if (!forceQuery) {
      const cachedData = await redis.get(`store:${maStore}`);
      if (cachedData) {
        // console.log("📦 Lấy từ Redis cache Store");
        return JSON.parse(cachedData);
      }
    }

    const store = await query(
      `SELECT * FROM dbo_Store WHERE MaStore = '${maStore}'`
    );

    if (!store) {
      throw new AppError(
        404,
        "⚠️ Không tìm thấy siêu thị!",
        "Get Store Failed!"
      );
    }
    // Cache dữ liệu với TTL là 1 giờ
    await redis.set(`store:${maStore}`, JSON.stringify(store), "EX", 86400);

    return store;
  } catch (error) {
    throw new AppError(
      500,
      error.message || "Lỗi không xác định",
      "❌ Lỗi truy vấn siêu thị!"
    );
  } finally {
    if (pool) await pool.close();
  }
};

module.exports = { GetStore };
