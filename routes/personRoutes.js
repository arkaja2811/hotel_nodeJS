const express = require('express');
const router = express.Router();
const Person = require('../models/person')
const {jwtAuthMiddleware, generateToken} = require('../jwt')

//post method for person endpoint
router.post('/signup', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('Person added successfully:')
    const payload = {
      id: response.id,
      username: response.username
    }
    const token = generateToken(payload);
    console.log('Generated Token:', token);
    res.status(200).json({response: response, token: token});
  }
  catch(err){
    console.log('Error adding person:', err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.post('/login', async(req, res)=>{
  try{
    const {username, password} = req.body;
    const user = await Person.findOne({username: username});
    if(!user || await !user.comparePassword(password))
    {
      return res.status(401).json({error: 'Invalid Username or password'})
    }
    //generate token
    const payload = {
      id: user.id,
      username: user.username
    }
    const token = generateToken(payload);
    return res.json({token})
  }
  catch(err){
    console.log(err)
    res.status(500).json({error: 'Internal Server Error'});
  }
})

router.get('/profile', jwtAuthMiddleware, async(req, res) => {
  try{
    const userData = req.userPayload;
    console.log("User Data: ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({user});
  }
  catch(err){
    console.error(err)
    res.status(500).json({error: 'Internal Server Error'})
  }
})

// get method for person endpoint 
router.get('/', jwtAuthMiddleware, async (req, res) => {
  try{
    const data = await Person.find();
    console.log("Persons retrieved successfully");
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//parameterized get method for person endpoint (through id)
router.get('/id/:id', async (req, res) => {
  try{
    const search_id = req.params.id;
    const data = await Person.find({id: search_id});
    console.log("Person data with id: ", search_id," retrieved successfully");
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

//parameterized get method for person endpoint (through work)
router.get('/work/:workType', async (req, res) => {
  try{
    const workType = req.params.workType;
    if (workType == 'Chef' || workType == 'Waiter' || workType == 'Manager'){
      const data = await Person.find({work: workType});
      console.log("Persons with work type: ", workType," retrieved successfully");
      res.status(200).json(data);
    }
    else{
      res.status(400).json({error: 'Invalid work type'});
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const personID = req.params.id;
    const updateData = req.body;
    const updatedPerson = await Person.findByIdAndUpdate(personID, updateData, {
      new: true,
      runValidators: true,
    });
    if(!updatedPerson){
      return res.status(404).json({error: "Person not found"});
    }
    console.log('Person updated successfully:', updatedPerson);
    res.status(200).json(updatedPerson);
  }
  catch(err){
    console.log('Error updating person:', err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const personID = req.params.id;
    const deletedPerson = await Person.findByIdAndDelete(personID, {
      new: true, 
      runValidators: true,
    });
    if(!deletedPerson){
      return res.status(404).json({error: "Person not found"});
    }
    console.log('Person deleted successfully:', deletedPerson);
    res.status(200).json(deletedPerson);
  }
  catch(err){
    console.log('Error deleting person:', err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

module.exports = router;