const bcrypt = require("bcrypt");
const User = require("../models/user.js")
async function adduser(user){
    var salt = await bcrypt.genSalt();
     const secret_password = await bcrypt.hash(user.password, salt);
    //Creating User
    let createduser = await User.create({
        name:user.name,
        password:secret_password,
        email:user.email,
    })
    return createduser;
}
module.exports = adduser;