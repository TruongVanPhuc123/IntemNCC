const fs = require("fs");
const { processExcel } = require("./middlewares/processExcel");
const filePath = "./MaSthiTrungChuyen.xlsx"
const fileBuffer = fs.readFileSync(filePath)
const data = processExcel(fileBuffer)
const sql = require("mssql");
require("dotenv").config();


const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    options: {
        encrypt: false, // nếu dùng Azure thì true
        trustServerCertificate: true
    }
};


// console.log(data)

async function importData() {
    try {
        const pool = await sql.connect(config);
        console.log("Start import ...")

        for (const row of data) {
            await pool.request()
                .input('MaStore', sql.Int, row.MaStore)
                .input('TenStore', sql.Text, row.TenStore)

                .query('INSERT INTO Store (MaStore, TenStore) VALUES (@MaStore, @TenStore)');
        }

        console.log('Import dữ liệu thành công!');
        sql.close();
    } catch (err) {
        throw new AppError(500, "Lỗi khi import!", err.message);
    }
}

importData();