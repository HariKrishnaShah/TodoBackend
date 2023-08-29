const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fetchuser = require("../middleware/fetchuser.js");
const jwtSecretKey = "IamHari";
let success = false;


try{
    //Adding task, login required
    router.post("/addtask", fetchuser, async(req, res)=>{
        let userId = req.user.id;
        //Checking if user exists
        let user = await User.findById(userId);
        if(user)
        {
            let task = await Task.create({

            });
        }
        return res.status(400).json({success, error:"Please Enter valid credentails."});
        
    })
}

catch(error)
{
    res.status(500).send("Error Occured" + error.message);
}

module.exports = router;