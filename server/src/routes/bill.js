const Bill = require('../models/Bill.js');
const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
    try{
        const data = await Bill.find();
        res.json(data).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.get('/user/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const data = await Bill.find({customer:id});
        res.json(data).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.post('/create', async (req, res) => {
    try{
        const data = new Bill(req.body);
        const newdata = await data.save();
        res.json({message: "item added", data:newdata}).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.put('/update', async (req, res) => {
    try{
        await Bill.findOneAndUpdate({_id: req.body.id}, req.body);
        res.json({message: "item updated"}).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.delete('/delete', async (req, res) => {
    try{
        await Bill.findByIdAndDelete({_id: req.body.id});
        res.json({message: "item deleted"}).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.get('/drop', async (req, res) => {
    try{
        const data = await Bill.deleteMany();
        res.json(data).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});


module.exports = router;

/*

create
{
	"customer": "user 01",
	"phone": "646546545465",
	"payment": 2342,
	"subtotal": 123,
	"items": ["apple", "banana"],
	"amount": 4,
	"tax": 123
}


*/