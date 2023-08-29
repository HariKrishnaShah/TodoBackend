const mongoose = require('mongoose')
const connectToDB = ()=>
{
    mongoose.connect('mongodb://0.0.0.0:27017/todo');
}

module.exports = {connectToDB};
