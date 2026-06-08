const express =
  require('express')

const router =
  express.Router()
const roleMiddleware =
  require(
    '../middleware/role.middleware'
  )
const {

  getUsers,

  createUser,

  deleteUser

} = require(
  '../controllers/user.controller'
)

const authMiddleware =
  require(
    '../middleware/auth.middleware'
  )

router.get(
  '/',
  authMiddleware,
roleMiddleware(
  'System Administrator'
),
  getUsers
)

router.post(
  '/',
  authMiddleware,
roleMiddleware(
  'System Administrator'
),
  createUser
)

router.delete(
  '/:id',
  authMiddleware,
roleMiddleware(
  'System Administrator'
),
  deleteUser
)

module.exports =
  router
