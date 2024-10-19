const mongoose = require('mongoose');
const path = require('path')
require("dotenv").config({path: path.resolve(__dirname, '../.env')})
mongoose.connect(process.env.Mongo_URL);

const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'Connection error:'));
module.exports = conn;

const jobs = new mongoose.Schema({
    jobTitle: {type: String},
    jobDesc: {type: String},
    experience: {type: String},
    candidates: {type: Array, default: []},
    endDate: {type: Date},
    companyEmail: {type: String}
});

module.exports = mongoose.model("jobs", jobs)