const express = require("express");
const routes = require("./api/routes/index");
const variables = require("./config/variables.js");
const cors = require("cors");
const db = require('./module/db');
// const select = require('./module/select');
const collection = require('./module/create');
const path = require('path');
const fs = require('fs');
let app = express();



// تنظیمات multer
const mime = require('mime-types');
const multer = require('multer');

// تابع بررسی نوع فایل


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = mime.extension(file.mimetype);
    cb(null, uniqueSuffix + '.' + fileExtension);
  }
});
app.options('/upload', cors()); // افزودن درخواست OPTIONS برای پیش‌بینی CORS

const upload = multer({
  storage: storage
});

app.post('/upload', cors(), upload.any(), (req, res) => {
	console.log(">>>>>>>>>>>>>>>>>>>>??");
  const file = req.files[0];
  const fileSize = file.size;
  const fileName = file.filename;
  const filePath = path.join(__dirname, file.path);
  console.log(fileName);

  res.json({fileName});
});
app.get('/uploads/:filename', cors(), (req, res) => {
	console.log(">>>>>>>>>>>>>>>>>>>>???");
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);
console.log(">>>>>>>>>>>>>>>>>>>>????");
  if (fs.existsSync(filePath)) {
	  console.log(">>>>>>>>>>>>>>>>>>>>?????");
    res.download(filePath, (err) => {
      if (err) {
        console.log('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      }
    });
  } else {
    console.log('File not found');
    res.status(404).send('File not found');
  }
});
app.use(
	cors({
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		origin: true,
	})
);
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
});
app.use(express.json());
app.use(routes);

app.listen(variables.port, () => console.log("server started on port", variables.port, variables.env));
