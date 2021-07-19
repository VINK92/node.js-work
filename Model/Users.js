const { Schema, model } = require("mongoose")

const user = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: {
    type: String,
    required: false,
  },
  avatarURL: {
    type: String,
    required: false,
  },
})

module.exports = model("User", user)
