var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const rateLimit = require("express-rate-limit");

var indexRouter = require('./routes/index');
const { sendResponse } = require('./helpers/utils');


const limiter = rateLimit({
    windowMs: 10 * 1000, // 10 giây
    max: 100, // Giới hạn 100 request mỗi 10 giây
    message: "Too many requests, please try again later."
});


var app = express();

app.use(limiter);
app.use(cors({ origin: '*' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api", indexRouter)

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.statusCOde = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log("❌ Error: ", err);
    return sendResponse(
        res,
        res.statusCode ? err.statusCode : 500,
        false,
        null,
        err.message,
        err.isOperational ? err.errorType : "Internal Server Error"
    );
});

if (global.gc) {
    setInterval(() => {
        global.gc();
        console.log("Forced garbage collection");
    }, 60000); // Thu gom rác mỗi 60s
}


module.exports = app;
