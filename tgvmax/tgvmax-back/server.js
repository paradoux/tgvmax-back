
const express = require('express');
const app = express();
const db = require('./config/dbconfig').db
const bodyParser = require('body-parser')
const cors = require('cors')
const indexRouter = require('./routes/IndexRouter').indexRouter

app.use(cors())

app.get('/', function (req, res) {
    res.send('Launch success !')
})

/* app.use(require('forest-express-mongoose').init({
    modelsDir: __dirname + '/models', // Your models directory.
    envSecret: '5f8a6d977e4e6cefbb21101d286baf854b9223f75043bce967b6a24cd3c26992',
    authSecret: '0kLkm6pxjHbFBskEJvnI9gaKtPpq6oKr',
    mongoose: require('mongoose') // The mongoose database connection.
}));
 */

app.use('/', indexRouter)

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})