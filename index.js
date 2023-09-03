const db = require("./db.js")
db.connectToDB();
const express = require("express");
const app = express();
var cors = require('cors');
const port = 4000; 
app.use("/", require("./routes/index.js"));
const userapi = require("./routes/user.api.js");
const taskapi = require("./routes/task.api.js")
const subtaskapi = require("./routes/subtask.api.js");
app.use(cors());
app.use(express.json())
app.use("/user", userapi);
app.use("/task", taskapi);
app.use("/subtask", subtaskapi);
app.listen(port, ()=>{
    console.log(`Listening at port: http://localhost:${port}`);
})

