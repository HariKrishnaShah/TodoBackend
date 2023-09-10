const Task = require("../models/task.js");

async function addtask(userid, title)
{
    let task = await Task.create({
        userid: userid,
        status: "pending",
        title:title,
    });
    return task;
}
module.exports = addtask;