const mongoose = require("mongoose");
const {Schema} = mongoose;

const taskSchema = new Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["pending", "completed"],
    },
    CreatedDate:{
        type:Date,
        default:Date.now()
    },
    description:{
        type:String,
    }
});

const Task = mongoose.model("user", taskSchema);
Task.createIndexes();
module.exports = Task;