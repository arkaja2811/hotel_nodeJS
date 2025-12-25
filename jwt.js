const jwt = require('jsonwebtoken');
require('dotenv').config();

//Define middelware function to verify JWT token
const jwtAuthMiddleware = (req, res, next) => {
    //first check request headers has authorization or not 
    const authorization = req.headers.authorization
    if(!authorization){
        return res.status(401).json({error: 'Unauthorized: Token not found!'});
    }
    //Extract token from Authorization header
    const token = req.headers.authorization.split(' ')[1];
    if (!token){
        return res.status(401).json({error: 'Unauthorized: No token provided'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userPayload = decoded; //Attach decoded user info to request object
        next(); //Move to next phase
    }
    catch(err){
        console.log('Error verifying token:', err);
        return res.status(401).json({error: 'Unauthorized: Invalid token'});
    }
}

//Function to generate JWT token for a user
const generateToken = (userPayload) => {
    return jwt.sign(userPayload, process.env.JWT_SECRET, {expiresIn:300000});
}
module.exports = {jwtAuthMiddleware, generateToken};