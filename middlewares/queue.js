const { default: PQueue } = require("p-queue");
const { AppError } = require("../helpers/utils");
const queue = new PQueue({ concurrency: 1 }); // Chỉ xử lý 1 request tại 1 thời điểm

module.exports = function queueMiddleware(req, res, next) {
    console.log("---Hàng đợi hoạt động---")
    queue.add(() => new Promise((resolve, reject) => {
        try {
            next();
            resolve();
        } catch (error) {
            reject(error);
        }
    })).catch(err => {
        throw new AppError(500, err.message, "Internal Server Error")
    });
};
