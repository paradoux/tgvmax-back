const mongoose = require('mongoose')
const env = require('dotenv').config();

const url = process.env.URL

mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Connection to DB is a success !')
});