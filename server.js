const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('Welcome to my hotel! \nHow may I help you?')
})

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})