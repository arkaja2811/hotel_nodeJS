const mongoose = require('mongoose')

//const mongoURL = process.env.LOCAL_DB_URL;
const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL)
 .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

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