const sql = require("mssql");
const { AppError } = require("./helpers/utils");
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    pool: {
        idleTimeoutMillis: 30000,
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

const getPool = async () => {
    try {
        const pool = await poolPromise;
        if (!pool.connected) {
            console.warn("⚠️ Pool mất kết nối, tạo lại...");
            poolPromise = sql.connect(config);
            return await poolPromise;
        }
        return pool;
    } catch (error) {
        console.warn("⚠️ Pool lỗi, tạo lại...");
        poolPromise = sql.connect(config);
        return await poolPromise;
    }
}

// Hàm truy vấn tối ưu
const query = async (queryString, id, input) => {
    try {
        const pool = await getPool();
        const request = pool.request();
        const result = await request.input(input, sql.Int, id).query(queryString);
        return result.recordset[0];
    } catch (error) {
        throw new AppError(500, error.message, "❌ Truy vấn dữ liệu thất bại!");
    }
}


module.exports = { query };
