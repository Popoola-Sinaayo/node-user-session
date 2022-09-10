const bcrypt = require("bcrypt");
const User = require("../models/user");
const Image = require("../models/image");
const jwt = require("jsonwebtoken");
exports.getUser = (req, res, next) => {
  res.render("auth/login", { login: true });
};

exports.postUser = (req, res, next) => {
  username = req.body.username;
  password = req.body.password;
  email = req.body.email;
  console.log(req.file.avatar);
  console.log(username, password, email);
  bcrypt
    .hash(password, 12)
    .then((result) => {
      if (result) {
        console.log(result);
        user = new User({
          username: username,
          password: result,
          email: email,
        });
        return user.save();
      }
      throw "Error";
    })
    .then((user) => {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id.toString(),
          },
          "somesupersecretsecret",
          { expiresIn: "1h" }
        );
      res.json({ message: "Rgisterred", token: token });
    });
  //   res.render("auth/login", { login: false });
};

exports.logUser = (req, res, next) => {
  password = req.body.password;
  email = req.body.email;
  console.log(email, password);
  User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.json({ message: "Invalid Email" });
      }
      bcrypt.compare(password, user.password).then((result) => {
        console.log(result);
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id.toString(),
            },
            "somesupersecretsecret",
            { expiresIn: "1h" }
          );
          return res.json({ message: "Validated", token: token });
        }
        return res.json({ message: "Invalid Credentials" });
      });
    })
    .catch((err) => console.log(err));
};

exports.logNew = (req, res, next) => {
  res.render("auth/signup");
};

exports.getLoad = (req, res, next) => {
  res.render("auth/imageUpload", { image: null });
};

exports.postImage = (req, res, next) => {
  console.log("here");
  console.log(req.file);
  console.log(req.file.filename);
  const url = req.file.filename;
  //   images = new Image({
  //     imageName: req.file.avatar,
  //   });
  res.render("auth/imageUpload", { image: url });
};

exports.createPost = (req, res, next) => {
  res.render("auth/create");
};
