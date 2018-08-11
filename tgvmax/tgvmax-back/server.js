
const express = require('express');
const app = express();
const db = require('./config/dbconfig').db
const bodyParser = require('body-parser')
const cors = require('cors')
const indexRouter = require('./routes/IndexRouter').indexRouter

app.use(cors()) //Allows CORS

app.get('/', function (req, res) {
    res.send('Launch success !')
})

app.use('/', indexRouter) //Express router

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})