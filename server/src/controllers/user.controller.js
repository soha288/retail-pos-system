const User =
  require('../models/user.model')

const getUsers =
  async (req, res) => {

    try {

      const users =
        await User.find()

      res.status(200).json({
        success: true,
        data: users
      })

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }

const createUser =
  async (req, res) => {

    try {

      const user =
        await User.create(
          req.body
        )

      res.status(201).json({
        success: true,
        data: user
      })

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }

const deleteUser =
  async (req, res) => {

    try {

      await User.findByIdAndDelete(
        req.params.id
      )

      res.status(200).json({
        success: true,
        message:
          'User deleted successfully'
      })

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }

module.exports = {
  getUsers,
  createUser,
  deleteUser
}
