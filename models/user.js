const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewUserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  productCreated: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
});

module.exports = mongoose.model("newUser", NewUserSchema);
