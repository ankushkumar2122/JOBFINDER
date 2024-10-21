const Review = require("../models/Review.js");
const Job = require("../models/job.js");    

module.exports.createReview=async (req, res) => {
    console.log(req.params.id);
    let job = await Job.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    console.log(newReview);
    job.reviews.push(newReview);
    await job.save();
    await newReview.save();
    req.flash("success","New review Add Succesfully");
    res.redirect(`/job/${job._id}`);
};

module.exports.deletereview=async (req, res) => {
    const { id, reviewId } = req.params;
    await Job.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" ," Review deleted");
    res.redirect(`/job/${id}`);
};