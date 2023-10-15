const User = require('../models/User.js');
const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
    try{
        const data = await User.find();
        res.json(data).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.get('/user/:id', async (req, res) => {
    try{
        const data = await User.findById(req.params.id);
        res.json(data).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.post('/create', async (req, res) => {
    try{
        const data = new User(req.body);
        await data.save();
        res.json({message: "user added"}).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.put('/update', async (req, res) => {
    try{
        await User.findOneAndUpdate({_id: req.body.id}, req.body);
        res.json({message: "user updated"}).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.delete('/delete', async (req, res) => {
    try{
        await User.findByIdAndDelete({_id: req.body.id});
        res.json({message: "user deleted"}).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.get('/drop', async (req, res) => {
    try{
        const data = await User.deleteMany();
        res.json(data).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});


module.exports = router;


/*
create
{
	"username": "user 01",
	"email": "user@gmail.com",
	"password": "d8w1342o812",
	"number": 1652342156,
}

update
{
    "id": "650077c500735b98cfe3982b",
    "username": "user 01",
	"email": "user@gmail.com",
	"password": "d8w1342o812",
	"number": 1652342156,
}

delete
{
    "id":"65006fdcec2e190fda654fcd",
}

*/