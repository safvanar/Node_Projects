
const express = require("express");
const mainControllers = require("../controllers/main")

const router = express.Router();

router.get("/",mainControllers.getMainPage);
// router.get("/get-data",userControllers.getUserData);
// router.delete("/delete-data/:id",userControllers.postDeleteData)




module.exports = router;