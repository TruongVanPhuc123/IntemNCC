const sql = require("mssql");
const { AppError } = require("./helpers/utils");
require("dotenv").config();

const config = {
    user: "sa",
    password: "1231",
    server: "113.161.162.83",
    database: "InTemNCC",
    port: 24032,
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
        throw new AppError(500, err.message, "❌ Kết nối SQL Server thất bại!");
    });

// Hàm truy vấn tối ưu
async function query(queryString, id, input) {
    try {
        const pool = await poolPromise; // Lấy connection từ pool
        const request = pool.request();

        const result = await request.input(input, sql.Int, id).query(queryString);
        return result.recordset[0];
    } catch (error) {
        throw new AppError(500, error.message, "❌ Truy vấn dữ liệu thất bại!");
    }
}

module.exports = { query };
