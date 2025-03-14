const sql = require("mssql");
const { AppError } = require("./helpers/utils");

const config = {
    user: "sa",
    password: "1231",
    server: "10.35.3.28", //10.35.3.28 //192.168.1.3
    database: "Test_Connect",
    options: {
        encrypt: false,
        enableArithAbort: true,
    },
};

// Biến toàn cục để giữ kết nối, tránh tạo nhiều connection gây lỗi
let poolPromise;

async function connectDB() {
    if (!poolPromise) {
        try {
            poolPromise = sql.connect(config); // Trả về Promise để tái sử dụng
            await poolPromise; // Đợi kết nối thành công
            console.log("✅ Kết nối SQL Server thành công!");
        } catch (err) {
            console.error("❌ Lỗi kết nối:", err);
            throw new AppError(500, err.message, "Database Connection Failed ❌");
        }
    }
    return poolPromise;
}

async function query(queryString) {
    try {
        let pool = await connectDB(); // Đảm bảo đã kết nối DB
        let result = await pool.request().query(queryString); // Thực hiện query
        return result.recordset[0]; // Trả về kết quả
    } catch (error) {
        throw new AppError(500, error.message, "Query Data Failed ❌");
    }
}

module.exports = { connectDB, query };
