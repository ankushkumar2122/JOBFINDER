const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const Job = require("../models/job.js");
const { isLoggedIn, isOwner, validatejob } = require("../middleware.js");

const jobcontroller = require("../controllers/job.js");

// Static routes should be defined first to avoid conflict with dynamic routes
// Terms and Conditions
router.get("/terms&condition", (req, res) => {
    res.render("jobs/Terms&Conditions.ejs");
});

// Privacy and Cookies
router.get("/privacy&cookies", (req, res) => {
    res.render("jobs/privacyandcookies.ejs");
});

// Contact Us
router.get("/contactus", (req, res) => {
    res.render("jobs/contactus.ejs");
});

// About Us
router.get("/aboutus", (req, res) => {
    res.render("jobs/aboutus.ejs");
});

// Routes for jobs
// Index route & create
router.route("")
    .get(WrapAsync(jobcontroller.index))
    .post(isLoggedIn, validatejob, WrapAsync(jobcontroller.createJob));

// New job
router.get("/new", isLoggedIn, jobcontroller.renderNewForm);

// Dynamic routes for show, update, delete
router.route("/:id")
    .get(WrapAsync(jobcontroller.showjob))
    .put(isLoggedIn, isOwner, validatejob, WrapAsync(jobcontroller.updateJob))
    .delete(isLoggedIn, isOwner, WrapAsync(jobcontroller.destroyJob));

// Edit job
router.get("/:id/edit", isLoggedIn, isOwner, WrapAsync(jobcontroller.renderEditForm));

module.exports = router;
