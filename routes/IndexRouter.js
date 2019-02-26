const express = require('express');
const { trainsRouter } = require('./TrainsRoutes');

const indexRouter = express.Router();

// let usersRouter = require('./UsersRoutes').usersRouter     //Preparation for possible user accounts

// indexRouter.use('/users', usersRouter)  //Preparation for possible user accounts
indexRouter.use('/trains', trainsRouter);

module.exports.indexRouter = indexRouter;
