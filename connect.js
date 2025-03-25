const sql = require("mssql");
const { AppError } = require("./helpers/utils");
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: 1433,
    pool: {
        idleTimeoutMillis: 30000, // Tự động đóng kết nối sau 30 giây không hoạt động
    },
    options: {
        encrypt: false, // Tắt SSL nếu không cần thiết
        enableArithAbort: true,
    },
};

// Biến toàn cục giữ kết nối để tái sử dụng, tránh mở nhiều connection gây lỗi
let poolPromise = sql.connect(config)
    .then(pool => {
        console.log("✅ Kết nối SQL Server thành công!");
        return pool;
    })
    .catch(err => {
        console.error("❌ Lỗi kết nối:", err);
        throw new AppError(500, err.message, "Database Connection Failed ❌");
    });

// Hàm truy vấn tối ưu
async function query(queryString, id) {
    try {
        const pool = await poolPromise; // Lấy connection từ pool
        const request = pool.request();

        const result = await request.input("maNCC", sql.Int, id).query(queryString);
        return result.recordset[0];
    } catch (error) {
        throw new AppError(500, error.message, "Query Data Failed ❌");
    }
}

module.exports = { query };
