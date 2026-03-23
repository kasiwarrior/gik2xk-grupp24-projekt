var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
<<<<<<< Updated upstream
const { access } = require('fs');

=======
var cors = require('cors');
>>>>>>> Stashed changes


var app = express();

// Enable CORS for frontend communication
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
    next();
});  

app.use("/api", require("./routes/productRoute"))
app.use("/api", require("./routes/userRoute"));


module.exports = app;
