const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");

const userRoutes = require("./routes/load");

app.set("view engine", "ejs");
app.set("views", "views");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/media/"));
  },
  filename: (req, file, cb) => {
    cb(null, Math.random().toString() + "-" + file.originalname);
  },
});

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images/", express.static(path.join(__dirname, "media")));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(upload.single("avatar"), userRoutes);
// app.listen(5000);
mongoose
  .connect("mongodb+srv://Popoola:Prayer1020@node-app.vkq5p.mongodb.net/test")
  .then((result) => {
    console.log("connected");
    app.listen(8080);
  })
  .catch((err) => console.log(err));
