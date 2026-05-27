const jwt = require('jsonwebtoken')

const protect = async (
  req,
  res,
  next
) => {

  try {

    const token =
      req.headers.authorization

    if (!token) {

      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    const decoded = jwt.verify(
      token,
      'secretkey'
    )

    req.user = decoded

    next()

  } catch (error) {

    res.status(401).json({
      success: false,
      message: 'Invalid token'
    })
  }
}

module.exports = {
  protect
}
