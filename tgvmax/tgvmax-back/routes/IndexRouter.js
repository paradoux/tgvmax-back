const express = require('express')

let indexRouter = express.Router()

//let usersRouter = require('./UsersRoutes').usersRouter
let trainsRouter = require('./TrainsRoutes').trainsRouter

//indexRouter.use('/users', usersRouter)
indexRouter.use('/trains', trainsRouter)

module.exports.indexRouter = indexRouter