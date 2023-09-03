const mongoose = require("mongoose");
const {Schema} = mongoose;

const SubTaskSchema = new Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    taskid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tasks'
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
    createdDate:{
        type:Date,
        default:Date.now()
    },
    description:{
        type:String,
    }
});

module.exports = mongoose.model("subtask", SubTaskSchema);