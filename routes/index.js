const router = require("express").Router();
router.get("/", (req, res)=>{
    res.send("Hari")
})


module.exports = router;