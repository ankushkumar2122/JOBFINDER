const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./Review.js");

const jobSchema = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    postby: String,
    date: {
        type: Date,
        default: Date.now
    },
    description: String,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});
 jobSchema.post("findOneAndDelete",async(job)=>{
    if(job){
        await Review.deleteMany({_id:{$in:job.reviews}});
   } }); 


//create collection
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
