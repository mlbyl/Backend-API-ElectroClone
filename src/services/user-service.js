const { ErrorResponse, SuccessResponse } = require("../helpers/response")
const { DATA_FETCHED_SUCCESFULLY, DATA_NOT_FOUND, USER_ALREADY_REGISTERED, USER_ALREADY_LOGGED_IN, DATA_ADDED_SUCCESFULLY, PASSWORD_MIN_MAX } = require("../helpers/response-messages")
const UserModel = require("../models/user-model")
const bcrypt = require("bcrypt")

const registerUser = async (user) => {
  try {
    if (user.password.length < 8 || user.password.length > 64) {
      return new ErrorResponse(PASSWORD_MIN_MAX)
    }
    //Hashing password
    const hashedPassword = await bcrypt.hash(user.password, 10)
    //Checking exist User 
    const existingUser = await checkIfUserExists(user)
    if (existingUser) {
      return existingUser
    }

    const newUser = new UserModel({
      firstname: user.firstname,
      surname: user.surname,
      email: user.email,
      password: hashedPassword
    })
    const result = await newUser.save()
    return new SuccessResponse(DATA_ADDED_SUCCESFULLY, result)
  } catch (error) {
    return new ErrorResponse(error.message)
  }

}
const findUserByEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email })
    return (user && user !== null) ? new SuccessResponse(DATA_FETCHED_SUCCESFULLY, user) : new ErrorResponse(DATA_NOT_FOUND)
  } catch (error) {
    return new ErrorResponse(error.message)
  }
}
const checkIfUserExists = async (user) => {
  try {
    const existUser = await findUserByEmail(user.email)
    if (existUser.status == true) {
      return new ErrorResponse(USER_ALREADY_REGISTERED)
    }
    return null
  } catch (error) {
    return new ErrorResponse(error.message)
  }
}
const getAllUsers = async () => {
  try {
    const allUsers = await UserModel.find({})
    if (allUsers.length === 0) {
      return new ErrorResponse(DATA_NOT_FOUND)
    }
    return new SuccessResponse(DATA_FETCHED_SUCCESFULLY, allUsers)
  } catch (error) {
    return new ErrorResponse(error.message)
  }
}


module.exports = { registerUser, findUserByEmail, getAllUsers }