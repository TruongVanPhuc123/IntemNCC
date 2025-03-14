const { query } = require("../connect");
const { AppError } = require("../helpers/utils");

async function GetDataNCC(maNCC, next) {
    try {
        const data = await query(`SELECT * FROM NhaCungCap WHERE MaNCC = ${maNCC}`)
        if (!data) throw new AppError(400, "⚠️ Hãy kiểm tra lại mã!", "Get data faild!")
        return data;
    } catch (error) {
        next(error)
    }
}

module.exports = { GetDataNCC }