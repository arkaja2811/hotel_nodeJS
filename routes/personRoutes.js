const express = require('express');
const router = express.Router();
const Person = require('../models/person')

//post method for person endpoint
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('Person added successfully:')
    res.status(200).json(response);
  }
  catch(err){
    console.log('Error adding person:', err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// get method for person endpoint 
router.get('/', async (req, res) => {
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