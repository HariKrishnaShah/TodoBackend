var jwt = require('jsonwebtoken');
jwtSecretKey = "IamHari";

const fetchuser = (req, res, next)=>
{
    const token = req.header('authToken')
    if(!token)
    {
        res.status(401).send({error:"Please authenticate with valid credentials"});
    }
    try
    {
        const data = jwt.verify(token, jwtSecretKey);
        //Adding user object data from the data to request.
        req.user = data.user;
        next()
    }
    catch(error){
        console.log(error.message);
        res.status(401).send({error:"Please authenticate with valid credentials"});    
}
}


module.exports = fetchuser;