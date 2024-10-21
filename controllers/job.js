const Job = require("../models/job.js");

module.exports.index = async (req, res) => {
    let alljobs = await Job.find({});
    res.render("jobs/index.ejs", { alljobs });
};
module.exports.renderNewForm = (req, res) => {
    console.log(req.user);
    res.render("jobs/newjob.ejs");
};

module.exports.showjob = async (req, res) => {
    let { id } = req.params;
    const job = await Job.findById(id).populate({
        path: "reviews", populate: {
            path: "author",
        },
    }).populate("owner");
    if (!job) {
        req.flash("error", "this job is doesn't exist");
        res.redirect("/job");
    }
    console.log(job);
    res.render("jobs/show.ejs", { job, currUser: req.user });
};

module.exports.createJob = async (req, res) => {
    const newjob = new Job(req.body.job);
    //    console.log(req.user);
    newjob.owner = req.user._id;
    await newjob.save();
    req.flash("success", "New Job Add Succesfully");
    res.redirect("/job");

};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        req.flash("error", "this job is doesn't exist");
        res.redirect("/job");
    }
    res.render("jobs/edit.ejs", { job });
};

module.exports.updateJob = async (req, res) => {
    let { id } = req.params;
    let job = await Job.findById(id);
    // if (!job.owner._id.equals(req.user._id)) {
    //     req.flash("error", "you  donot have permition to edit");
    //     return res.redirect(`/job/${id}`);
    // }
    await Job.findByIdAndUpdate(id, { ...req.body.job });
    req.flash("success", " Job updated");
    res.redirect(`/job/${id}`);
};

module.exports.destroyJob = async (req, res) => {
    let { id } = req.params;
    let deletejob = await Job.findByIdAndDelete(id);
    console.log(deletejob);
    req.flash("success", " Job deleted");
    res.redirect("/job");
};