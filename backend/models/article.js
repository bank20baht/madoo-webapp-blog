const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    require: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_img: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model("article", articleSchema);

module.exports = { Article };