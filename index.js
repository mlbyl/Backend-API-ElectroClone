const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()


const PORT = process.env.PORT

//built-in bodyparser of express.js
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.send("hello world")
})
app.listen(PORT, () => {
  console.log(`App listening on Port : ${PORT}`)
})