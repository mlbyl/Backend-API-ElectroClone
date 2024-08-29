const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDatabase = require('./src/helpers/connect-database')
dotenv.config()

//Routes
const userRouter = require('./src/routes/user-route')
//Helper function for connection to Database
connectDatabase()

const PORT = process.env.PORT

//built-in bodyparser of express.js
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", userRouter)

app.listen(PORT, () => {
  console.log(`App listening on Port : ${PORT}`)
})