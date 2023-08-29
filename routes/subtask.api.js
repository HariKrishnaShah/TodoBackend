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

}

catch(error)
{
    res.status(500).send("Error Occured" + error.message);
}

module.exports = router;