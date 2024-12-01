const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/subscribers')
const db = mongoose.connection

db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('DB connected'))

app.use(express.json());

const subscribersRouter = require('./router/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(5000, ()=> console.log('server started'))