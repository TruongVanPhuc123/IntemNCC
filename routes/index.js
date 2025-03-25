const express = require('express');
const router = express.Router();
const multer = require('multer');
const { generateExcelFile } = require("../controller/generateExcelFile");
const queueMiddleware = require("../middlewares/queueMiddleware");
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 3 * 1024 * 1024 }, });

router.post("/upload/:maNCC", queueMiddleware, upload.single("file"), generateExcelFile)


module.exports = router;