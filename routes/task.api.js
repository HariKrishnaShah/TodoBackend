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
        try{
            let uid = req.user.id;
            //Checking if user exists
            let user = await User.findById(uid);
            let task;
            if(user)
            {
                task = await Task.create({
                    userid: uid,
                    status: "pending",
                    title:req.body.title,
                    description:req.body.description
                });
                return res.json(task + "Task added sucessfully");
            }
            return res.status(400).json({success, error:"Please Enter valid credentails."});
        }
        catch(error)
        {
            res.status(500).send("Internal error occured.");
        }
        
    })

    //fetching all tasks login required
    router.get("/viewtasks", fetchuser, async(req, res) =>{
        try{
        let uid = req.user.id;
        let tasks = await Task.find({userid:uid});
        res.json(tasks);
    }
    catch(error)
    {
        res.status(500).send("Internal error occured.");
    }
});

// Delete a task login required

router.delete("/deletetask", fetchuser, async(req, res)=>{
    try{
        let uid = req.user.id;
        let taskid = req.body.taskid;
        let task = await Task.findById(taskid);
        console.log(task);
        //Check if task exist
        if(!task)
        {
            return res.send("The requested task doesn't exist");
        }
        // Check if the user owns the tasks
        if(task.userid.toString()!=uid)
        {
            return res.send("The note doesn't belong to you. It can't be deleted");
        }
        task = await Task.findByIdAndDelete(taskid);
        return res.status(200).send("Task deleted sucessfully");
    }
    catch(error)
    {
        res.status(500).send({error: "Internal error occured"});
    }
    

})

//Update status of the task
router.put("/updatetask", fetchuser, async(req, res)=>{
    try{
        let uid = req.user.id;
        let taskid = req.body.taskid;
        let task = await Task.findById(taskid);
        //Check if task exist
        if(!task)
        {
            return res.status(400).send("The requested task doesn't exist");
        }
        // Check if the user owns the tasks
        if(task.userid.toString()!=uid)
        {
            return res.status(400).send("The note doesn't belong to you. It can't be deleted");
        }
        let taskStatus = task.status;
        let newStatus = ""
        if(taskStatus === "pending")
        {
            newStatus = "completed"
        }
        else{
            newStatus = "pending";
        }
        task = await Task.findByIdAndUpdate(taskid, {$set: {status:newStatus}}, {new:true} );
        return res.status(200).send("Task's status updated successfully");
    }
    catch(error)
    {
        res.status(500).send({error: "Internal error occured"});
    }
    

})

}
catch(error)
{
    res.status(500).send("Error Occured" + error.message);
}
    
        

module.exports = router;