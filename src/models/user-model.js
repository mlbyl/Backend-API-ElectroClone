const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstname: {
    type: String, required: [true, "Firstname required"], minlength: [3, "Firstname must be at least 3 characters long"], maxlength: [50, "Firstname cannot exceed 50 characters"]
  },
  surname: {
    type: String, required: [true, "Surname required"], minlength: [3, "Surname must be at least 3 characters long"], maxlength: [50, "Surname cannot exceed 50 characters"]
  },
  email: {
    type: String, required: [true, "Email required"],
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please fill a valid email address"]
  },
  password: {
    type: String, required: [true, "Password required"], minlength: [8, "Password must be at least 8 characters long"], maxlength: [64, "Password cannot exceed 64 characters "]
  }
}, { timestamps: true })

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel