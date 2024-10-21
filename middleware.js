const Job = require("./models/job");
const ExpressError = require("./utils/ExpressError.js");
const { jobSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/Review.js");

module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.path,"..",req.orignalUrl);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;//login ke badd dubara usi tab par bej dega
        req.flash("error", "you must be  login to create job");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let job = await Job.findById(id);
    if (!job.owner._id.equals(req.user._id)) {
        req.flash("error", "you are not the owner of this Job");
        return res.redirect(`/job/${id}`);
    }
    next();
};

module.exports.validatejob = (req, res, next) => {
    const { error } = jobSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        return next(new ExpressError(400, errMsg));
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        return next(new ExpressError(400, errMsg));
    }
    next();
};


module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "you are not the Author of this Job");
        return res.redirect(`/job/${id}`);
    }
    next();
};