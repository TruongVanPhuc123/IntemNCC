const Redis = require("ioredis");
const sql = require("mssql");
require("dotenv").config();
const { AppError } = require("../helpers/utils");

const redis = new Redis(); // Kết nối Redis, mặc định localhost:6379

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const GetStore = async (maStore, forceQuery = false) => {
    let pool;
    try {
        if (!maStore) throw new Error("Thiếu maStore!");

        if (!forceQuery) {
            const cachedData = await redis.get(`store:${maStore}`);
            if (cachedData) {
                console.log("📦 Lấy từ Redis cache");
                return JSON.parse(cachedData);
            }
        }

        pool = await sql.connect(config);
        const result = await pool.request()
            .input("MaStore", sql.Int, maStore)
            .query("SELECT * FROM Store WHERE MaStore = @MaStore");

        const data = result.recordset;
        // console.log("🟨 Kết quả SQL:", data);

        if (Array.isArray(data) && data.length > 0) {
            await redis.set(`store:${maStore}`, JSON.stringify(data[0]), "EX", 86400);
            return data[0];
        } else {
            throw new AppError(404, `⚠️ Không tìm thấy siêu thị với mã ${maStore}`, "Get data failed!");
        }
    } catch (error) {
        throw new AppError(500, error.message || "Lỗi không xác định", "❌ Lỗi truy vấn siêu thị!");
    } finally {
        if (pool) await pool.close();
    }
}


module.exports = { GetStore };
