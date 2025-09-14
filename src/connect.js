const { AppError } = require("./helpers/utils");
const odbc = require("odbc");

const dbPath = "C:\\Users\\khod2\\Data_Web_Intem.accdb";
const connString = `DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=${dbPath}`;

let poolPromise = odbc
  .connect(connString)
  .then((conn) => {
    console.log("✅ Kết nối Access thành công!");
    return conn;
  })
  .catch((err) => {
    throw new AppError(500, err.message, "❌ Kết nối Access thất bại!");
  });

const getPool = async () => {
  try {
    const conn = await poolPromise;
    return conn;
  } catch (error) {
    console.warn("⚠️ Pool lỗi, tạo lại...");
    poolPromise = odbc.connect(connString);
    return await poolPromise;
  }
};

// Hàm truy vấn tối ưu
const query = async (queryString) => {
  try {
    const conn = await getPool();
    const result = await conn.query(queryString);
    // console.log(result);
    return result[0];
  } catch (error) {
    throw new AppError(500, error.message, "❌ Truy vấn dữ liệu thất bại!");
  }
};

module.exports = { query };
