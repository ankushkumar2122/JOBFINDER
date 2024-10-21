const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const Job = require("../models/job.js");
const { isLoggedIn,isOwner,validatejob } = require("../middleware.js");

const jobcontroller=require("../controllers/job.js");



 
//index route & //create
router.route("")
.get( WrapAsync(jobcontroller.index ))
.post( isLoggedIn, validatejob, WrapAsync(jobcontroller.createJob));


//new job
router.get("/new", isLoggedIn,jobcontroller.renderNewForm);

//show route & //update & //delete
router.route("/:id")
.get( WrapAsync(jobcontroller.showjob))
.put( isLoggedIn, isOwner,validatejob, WrapAsync(jobcontroller.updateJob))
.delete( isLoggedIn,isOwner, WrapAsync(jobcontroller.destroyJob));




// term and condition
router.get("/terms&condition", (req, res) => {
    res.render("jobs/Terms&Conditions.ejs");
});
//privacy and cookies
router.get("/privacy&cookies", (req, res) => {
    res.render("jobs/privacyandcookies.ejs");
});
//contactus
router.get("/contactus", (req, res) => {
    res.render("jobs/contactus.ejs");
});
//about us
router.get("/aboutus", (req, res) => {
    res.render("jobs/aboutus.ejs");
});







//edit
router.get("/:id/edit", isLoggedIn,isOwner, WrapAsync(jobcontroller.renderEditForm));







module.exports = router;