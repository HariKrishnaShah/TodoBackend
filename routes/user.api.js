const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fetchuser = require("../middleware/fetchuser.js");
const jwtSecretKey = "IamHari";
let success = false;
try{
    router.post("/createuser", [ 
      body('name', "Enter a valid name").isLength({min:3}),
      body('email', "Enter a valid mail").isEmail(),
      body('password', "Password must be atleast 3 characters").isLength({min:3}),
  ], async(req, res)=>{
        const result = validationResult(req); 
        console.log("Error result is " + result);
        if(result.isEmpty()){
            //Checking if user already exists
             let user = await User.findOne({email:req.body.email});
        if(user)
        {
        return res.status(400).json({success:false, error:"Sorry ! an user already exists with that email. Enter another email and try again."});
        }
            var salt = await bcrypt.genSalt();
            const secret_password = await bcrypt.hash(req.body.password, salt);
            //Creating User
            user = await User.create({
                name:req.body.name,
                password:secret_password,
                email:req.body.email,
            })
            const userdata = {user:{id:user.id}};
            success = true;
            const authToken = jwt.sign(userdata, jwtSecretKey);
            return res.json({"success": true, "authtoken": authToken, "userdetails": user})
        }
        res.send({ errors: result.array() });
    })


    //api for login. No login required
router.post('/login',[ 
    body('email', "Enter a valid mail").isEmail(),
    body('password', "Password cant't be blank.").exists(),
  ], async(req, res)=>{
    const result = validationResult(req); 
    if (!result.isEmpty()) {
  
        return res.status(400).json({"success":false, errors:result.array()});
      }
  
      const {email, password} = req.body;
      try
      {
        let user = await User.findOne({email:email})
        if(!user)
        {
          return res.status(400).json({"success":false, error:"Please try again with correct credentials."});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare)
        {
          return res.status(400).json({"success":false, error:"Please try again with correct credentials."})
        }
  
        const data = {
          user:{
            id:user.id
          }
        }
        const authToken = jwt.sign(data, jwtSecretKey);
        success = true;
        res.json({"success":true, "authToken":authToken})
      }
      catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");}
    })
  
  //api for getting user details //login required
    router.post("/getuser", fetchuser, async(req, res)=>{
      try
      {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        if(user)
        {
          res.json(user)
        }
        else
        {
          res.status(404).send("Please Login with valid credentails")
        }
        
      }
      catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");}
      })
}
catch(error)
{
    console.log("Error occured: " + error.message)
    res.status(500).send("Internal Server Error");
}
module.exports = router;