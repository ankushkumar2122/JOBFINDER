const mongoose = require("mongoose");
const initdata = require("./data.js");
const Job = require("../models/job.js");



const MONGO_URL = "mongodb://127.0.0.1:27017/jobfinder";
main().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL);
}

const initdb = async () => {
    try {
        await Job.deleteMany({});
        initdata.data=initdata.data.map((obj) => ({ ...obj, owner: "6711e20e58693f6d8c4b40fd" }));//to add owner proprties 
        await Job.insertMany(initdata.data);
        console.log("data was initialized");
    } catch (error) {
        console.error("Error initializing database:", error); 
    }
};


initdb();
