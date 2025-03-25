const { query } = require("../connect");
const { AppError } = require("../helpers/utils");
const redis = require("redis")

const client = redis.createClient({
    url: "redis://localhost:6379"
});

client.on("error", (err) => console.error("❌ Redis Error:", err));
client.connect().then(() => console.log("✅ Redis Connected")).catch(err => console.error("❌ Redis Connectiion Error:", err));

async function GetDataNCC(maNCC, next) {
    const cacheKey = "NCCData"
    const cacheData = await client.get(cacheKey);
    try {
        if (cacheData) {
            return
        }
        const data = await query(`SELECT TOP 1 * FROM NhaCungCap WHERE MaNCC = @maNCC`, maNCC)
        if (!data || data.length === 0) {
            throw new AppError(404, "⚠️ Không tìm thấy nhà cung cấp!", "Get data failed!");
        }
        return data;
    } catch (error) {
        next(error)
    }
}

module.exports = { GetDataNCC }