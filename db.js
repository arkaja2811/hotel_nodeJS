const mongoose = require('mongoose')
require('dotenv').config();

const mongoURL = process.env.LOCAL_DB_URL;
//const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB successfully');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB successfully');
});

db.on('error', (err) => {
    console.log('Error connecting to MongoDB successfully', err);
});

module.exports = db;