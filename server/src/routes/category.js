const Category = require('../models/Category.js');
const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
    try{
        const data = await Category.find();
        res.json(data).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.post('/create', async (req, res) => {
    try{
        const data = new Category(req.body);
        const newdata = await data.save();
        res.json({message: "item added", data: newdata}).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.put('/update', async (req, res) => {
    try{
        await Category.findOneAndUpdate({_id: req.body.id}, req.body);
        res.json({message: "item updated"}).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.delete('/delete', async (req, res) => {
    try{
        await Category.findByIdAndDelete({_id: req.body.id});
        res.json({message: "item deleted"}).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

module.exports = router;

/*
create
{
    "title":"ice creams"
}

update
{
    "id":"65006fdcec2e190fda654fcd",
    "title":"ice creams"
}

delete
{
    "id":"65006fdcec2e190fda654fcd",
}

*/ 
