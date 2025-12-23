const mongoose = require('mongoose');
const router = require('express').Router();
const MenuItem = require('./../models/menu');

//post method for menu endpoint 
router.post('/', async (req, res) => {
  try{
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("Menu item added successfully");
    res.status(200).json(response);
  }
  catch(err){
    console.log("Error adding menu item", err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// get method for menu endpoint
router.get('/', async (req, res) => {
  try{
    const data = await MenuItem.find();
    console.log("Menu items retrieved successfully");
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//parameterized get method for menu (through taste)
router.get('/taste/:tasteType', async (req, res) => {
  try{
    tasteType = req.params.tasteType;
    if (tastetype == 'Sweet' || tasteType == 'Sour' || tasteType == 'Bitter' || tasteType == 'Salty' || tasteType == 'Umami'){
      const data = await Person.find({taste: tasteType});
      console.log('Dish of taste ', tasteType, ' fetched successfully');
      res.status(200).json(data)
    }
    else{
      console.log('Invalid Dish taste type');
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.put('/:id', async (req, res) => {
    try{
        const itemID = req.params.id;
        const updatedMenuItem = req.body;
        const updatedItem = await MenuItem.findByIdAndUpdate(itemID, updatedMenuItem, {
            new: true, 
            runValidators: true
        });
        if (!updatedItem){
            console.log("Menu item not found with id: ", itemID);
            return res.status(404).json({error: 'Menu item not found'});
        }
        console.log('Menu item with id ', itemID, ' updated successfully');
        res.status(200).json(updatedItem);
    }
    catch(err){
        console.log('Error updating menu item: ', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const itemID = req.params.id;
        const deletedItem = await MenuItem.findByIdAndDelete(itemID);
        if (!deletedItem){
            console.log("Menu item not found with id: ", itemID);
            return res.status(404).json({error: 'Menu item not found'});
        }
        console.log('Menu item with id ', itemID, ' deleted successfully');
        res.status(200).json(deletedItem);
    }
    catch(err){
        console.log('Error deleting menu item: ', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;