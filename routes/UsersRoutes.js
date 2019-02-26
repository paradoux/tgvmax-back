const express = require('express');
let usersRouter = express.Router();

let User = require('../models/user');

usersRouter.get('/list', (req, res) => {
    User.find({}).then(eachOne => {
        res.json(eachOne);
    })
});

module.exports.usersRouter = usersRouter;

