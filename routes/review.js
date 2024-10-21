const express = require("express");
const router = express.Router({mergeParams:true});
const ExpressError = require("../utils/ExpressError.js");
const WrapAsync = require("../utils/WrapAsync.js");
const Review = require("../models/Review.js");
const Job = require("../models/job.js");
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewcontroller=require("../controllers/review.js");


//review 
router.post("/",isLoggedIn, validateReview, WrapAsync(reviewcontroller.createReview));
// delete reviewrout
router.delete("/:reviewId", isLoggedIn,isReviewAuthor,WrapAsync(reviewcontroller.deletereview)
);


module.exports = router;