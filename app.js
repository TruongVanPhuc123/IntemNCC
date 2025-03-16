var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');
const { sendResponse } = require('./helpers/utils');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", indexRouter)

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
    }, 30000); // Thu gom rác mỗi 30s
}


module.exports = app;
