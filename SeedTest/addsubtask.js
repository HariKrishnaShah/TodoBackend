const SubTask = require("../models/subtask.js");

async function addsubtask(userid, taskid, title)
{
    let subtask = await SubTask.create({
        userid: userid,
        taskid:taskid,
        status: "pending",
        title:title,
    });
    return subtask;
}
module.exports = addsubtask;