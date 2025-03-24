if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const errorHandler = require('./middleware/errorHandler')
const apiRoute = require('./routes/api')
const express = require('express')
const cors = require('cors');

const app = express()

// Enable CORS for all domains (bisa juga untuk domain/origin tertentu)
app.use(cors());

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', apiRoute)

app.use(errorHandler)

module.exports = app