if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

// console.log(process.env);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
// const Joi = require("joi");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const jobRouter = require("./routes/job.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const { error } = require('console');



// const MONGO_URL = "mongodb://127.0.0.1:27017/jobfinder";
const dbUrl ="mongodb+srv://ankushkumarsingh308:LhARn5xBo5qXeU0w@jobfinder.7mgbc.mongodb.net/?retryWrites=true&w=majority&appName=JOBFINDER";
main().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
});
async function main() {
    await mongoose.connect(dbUrl);
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:34*3600,
});
store.on("err",()=>{
    console.log("error in mongo sesseion store",err);
});

const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true,
    },
};



// app.get("/job", (req, res) => {
//     res.send("JOB FINDER");
// });


app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.CurrUser = req.user;
    // console.log(res.locals.success);
    next();
});

// app.get("/demouser",async(req,res)=>{
//     let fakeuser= new User({
//         email:"ankush@gmail.com",
//         username:"ankush"
//     });
//     let registerUser=await User.register(fakeuser,"abc");
//     res.send(registerUser);
// });








app.use("/job", jobRouter);
app.use("/job/:id/review", reviewRouter);
app.use("/", userRouter);






// app.get("/listing", async (req, res)=>{
//     let samplelisting = new Listing({
//        companyName: "Tcs hiring",
//         postby: "Ankush Singh",
//         description: "he hiring process for Tata Consultancy Services (TCS) typically involves several stages, and it may vary slightly based on the position you're applying for. Here’s an overview of the general process:",
//         location: "Ludhiana,Punjab",
//         country: "India",
//     });
//     await samplelisting.save();
//     console.log("sample is save");
//     res.send("Sucessful send in db");
// });

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page is Not Found!"));
});


app.use((err, req, res, next) => {
    // console.error(err);
    let { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render("error.ejs", { message });
});



app.listen(8080, () => {
    console.log("server is listing on port 8080");
});