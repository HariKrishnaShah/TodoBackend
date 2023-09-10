const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Task = require("../models/task.js");
const SubTask = require("../models/subtask.js")
const fetchuser = require("../middleware/fetchuser.js");


try{
    router.post("/addsubtask", fetchuser, async(req, res)=>{
        try{
            let uid = req.user.id;
            let taskid = req.body.taskid;
            let user = await User.findById(uid);
            let task = await Task.findById(taskid);
            //Checking if user and task exist exists
            let subtask;
            if(!user)
            {
                return res.status(404).send({error:"User doesn't exist"});
            }
            if(!task)
            {
                return res.status(404).send({error:"Task doesn't exist"});
            }
                subtask = await SubTask.create({
                    userid: uid,
                    taskid:req.body.taskid,
                    status: "pending",
                    title:req.body.title,
                    description:req.body.description
                });
                return res.json(subtask);
        }
        catch(error)
        {
            res.status(500).send({error: "Internal error occured."});
        }
    })
    //fetching all tasks login required // Yet to modify for aggregate
    router.get("/viewsubtasks", fetchuser, async(req, res) =>{
        try{
        let uid = req.user.id;
        let tid = req.body.taskid;
        //Check if tasks exist
        let tasks = Task.findById(tid);
        if(!tasks)
        {
           return res.status(401).send("Task doesn't exist");
        }
        let subtasks = await SubTask.find({userid:uid, taskid:tid});
        return res.json(subtasks);
    }
    catch(error)
    {
        res.status(500).send({error:"Internal error occured."});
    }
});

router.delete("/deletesubtask", fetchuser, async(req, res)=>{
    try{
        let uid = req.user.id;
        let subtaskid = req.body.subtaskid;
        let subtask = await SubTask.findById(subtaskid);
        //Check if subtask exist
        if(!subtask)
        {
            return res.send("The requested subtask doesn't exist");
        }
        // Check if the user owns the tasks
        if(subtask.userid.toString()!=uid)
        {
            return res.send("The subtask doesn't belong to you. It can't be deleted");
        }
        subtask = await SubTask.findByIdAndDelete(subtaskid);
        return res.status(200).send("SubTask deleted sucessfully");
    }
    catch(error)
    {
        res.status(500).send({error: "Internal error occured"});
    }
    

});
//Update status of the subtask
router.put("/updatesubtask", fetchuser, async(req, res)=>{
    try{
        let uid = req.user.id;
        let subtaskid = req.body.subtaskid;
        let markasdone = req.body.markasdone;
        let subtask = await SubTask.findById(subtaskid);
        //Check if task exist
        if(!subtask)
        {
            return res.status(400).send("The requested subtask doesn't exist");
        }
        // Check if the user owns the tasks
        if(subtask.userid.toString()!=uid)
        {
            return res.status(400).send("The subtask doesn't belong to you. It can't be deleted");
        }
        let newStatus;
        if(subtask.status === "completed")
        {
            newStatus = "pending"
        }
        else if(subtask.status === "pending")
        {
            newStatus = "completed";
        }
        if(markasdone && markasdone ==="yes")
        {
            newStatus = "completed";
        }
        subtask = await SubTask.findByIdAndUpdate(subtaskid, {$set: {status:newStatus}}, {new:true} );
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