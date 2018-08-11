const express = require('express')

let indexRouter = express.Router()

//let usersRouter = require('./UsersRoutes').usersRouter     //Preparation for possible user accounts
let trainsRouter = require('./TrainsRoutes').trainsRouter

//indexRouter.use('/users', usersRouter)  //Preparation for possible user accounts
indexRouter.use('/trains', trainsRouter)

module.exports.indexRouter = indexRouter