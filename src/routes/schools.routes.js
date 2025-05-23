const express = require("express");
const { addSchool, listSchools } = require("../controllers/schools.controllers");

const router = new express.Router();

//route checkup
router.get("/route-check", (req, res) => {
    res.status(200).send("Hello from router");
})

//POST Method addSchool route
router.post("/addSchool", addSchool);

//GET Method listSchools route
router.get("/listSchools", listSchools);


module.exports = router;