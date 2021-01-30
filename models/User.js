const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: "staff",
    enum: ["admin", "staff"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  bcrypt.hash(user.password, 12, (err, hash) => {
    if (err) {
      return new Error("Failed to generate hash");
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
