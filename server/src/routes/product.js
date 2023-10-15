const Product = require('../models/Product.js');
const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
    try{
        const data = await Product.find();
        res.json(data).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.post('/create', async (req, res) => {
    try{
        const data = new Product(req.body);
        const newdata = await data.save();
        res.json({message: "item added", data: newdata}).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.put('/update', async (req, res) => {
    try{
        await Product.findOneAndUpdate({_id: req.body.id}, req.body);
        res.json({message: "item updated"}).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.delete('/delete', async (req, res) => {
    try{
        await Product.findByIdAndDelete({_id: req.body.id});
        res.json({message: "item deleted"}).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.get('/drop', async (req, res) => {
    try{
        const data = await Product.deleteMany();
        res.json(data).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

module.exports = router;

/*
create
{
	"title":"apple",
	"image":"https://i.lezzet.com.tr/images-xxlarge-secondary/elma-nasil-yenir-221135ca-f383-474c-a4f5-ad02a45db978.jpg",
	"price": 1,
	"category":"food"
}

update
{
    "id": "650077c500735b98cfe3982b",
    "title": "almaasdasdsadasas",
    "image": "http://asdsadsadsadasda",
    "price": 2,
    "category": "drink"
}

delete
{
    "id":"65006fdcec2e190fda654fcd",
}

*/ 
