const bcrypt =
  require('bcryptjs')

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
        message:
          error.message
      })
    }
  }

const createUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        role
      } = req.body

      const existingUser =
        await User.findOne({
          email
        })

      if (existingUser) {

        return res.status(400).json({
          success: false,
          message:
            'User already exists'
        })
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        )

      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword,

          role
        })

      res.status(201).json({
        success: true,
        data: user
      })

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
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
        message:
          error.message
      })
    }
  }

module.exports = {

  getUsers,

  createUser,

  deleteUser
}
