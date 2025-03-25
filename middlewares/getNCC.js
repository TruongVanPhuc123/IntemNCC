const { query } = require("../connect");
const { AppError } = require("../helpers/utils");

async function GetDataNCC(maNCC, next) {
    const cacheKey = "NCCData"
    try {
        const data = await query(`SELECT TOP 1 * FROM NhaCungCap WHERE MaNCC = @maNCC`, maNCC)
        if (!data || data.length === 0) {
            throw new AppError(404, "⚠️ Không tìm thấy nhà cung cấp!", "Get data failed!");
        }
        return data;
    } catch (error) {
        throw new AppError(500, error.message, "Query NCC Error!")
    }
}

module.exports = { GetDataNCC }