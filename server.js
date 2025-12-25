const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const passport = require('./auth');
const PORT = process.env.PORT || 3000;


//Middleware Function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
  next(); //Move to next phase
}

app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/', localAuthMiddleware, (req, res) => {
  res.send('Welcome to my hotel! \nHow may I help you?')
})

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', localAuthMiddleware, menuRoutes);

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000')
})