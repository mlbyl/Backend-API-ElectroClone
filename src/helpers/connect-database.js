const mongoose = require('mongoose')
require('dotenv').config()
const URI = process.env.URI

const connectDatabase = async (uri) => {
  try {
    await mongoose.connect(URI)
    console.log("MongoDB succesfully connected")
  } catch (error) {
    console.log("error : " + error)
  }
}
module.exports = connectDatabase