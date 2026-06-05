const bcrypt =
  require('bcryptjs')

const jwt =
  require('jsonwebtoken')

const User =
  require('../models/user.model')

const loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body

      const user =
        await User.findOne({
          email
        })

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            'User not found'
        })
      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        )

      if (!isMatch) {

        return res.status(400).json({
          success: false,
          message:
            'Invalid credentials'
        })
      }

      const token =
        jwt.sign(

          {
            id: user._id,
            role: user.role
          },

          process.env.JWT_SECRET,

          {
            expiresIn: '1d'
          }
        )

      res.status(200).json({

        success: true,

        token,

        user
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
  loginUser
}
