const User = require('../models/User.js');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/register', async (req, res) => {
    try{
        const {username, email, password} = req.body;

        const find = await User.findOne({email});

        if(find){
            res.json({message:'user already exists', status:false}).status(404);
            return
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const data = new User({
            username, email, password: hashedPassword
        })
        
        const newdata = await data.save();

        res.json({message: "a new user created successfully", status:true}).status(200);
    }catch(error){
        res.json(error).status(400);
    }
});

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const data = await User.findOne({email});

        if(!data){
            res.json({message:'user not found'}).status(404);
            return
        }

        const encoded = await bcrypt.compare(
            password, 
            data.password
        );

        if(!encoded){
            res.json({message:'wrong password'}).status(404);
            return;
        }

        console.log(data);

        res.json({message: 'logged in', data, status:true}).status(200);
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
	"password": "d8w1342o812"
}

login
{
	"email": "user@gmail.com",
	"password": "d8w1342o812"
}

*/