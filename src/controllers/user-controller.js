const { ErrorResponse, SuccessResponse } = require('../helpers/response')
const { DATA_NOT_FOUND } = require('../helpers/response-messages')
const userService = require('../services/user-service')
const registerUser = async (req, res) => {
  const { firstname, surname, email, password } = req.body

  if (!firstname || !surname || !email || !password) {
    return res.status(400).json(new ErrorResponse("firstname,surname,email and password are all required fields"))
  }

  const newUser = await userService.registerUser({ firstname, surname, email, password })
  return (newUser) ? res.status(201).json(new SuccessResponse(newUser.message, newUser.data)) : res.status(500).json(new ErrorResponse(newUser.message))
}
const getAllUsers = async (req, res) => {
  const allUsers = await userService.getAllUsers()
  if (allUsers) {
    return res.status(200).json(allUsers)
  }
  return (allUsers.message === DATA_NOT_FOUND) ? res.status(404).json(allUsers) : res.status(500).json(allUsers)
}

module.exports = { registerUser, getAllUsers }