const mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost:27017/hotels'

mongoose.connect(mongoURL);

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