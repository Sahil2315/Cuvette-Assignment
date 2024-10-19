const mongoose = require('mongoose');
const path = require('path')
require("dotenv").config({path: path.resolve(__dirname, '../.env')})
mongoose.connect(process.env.Mongo_URL);

const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'Connection error:'));
module.exports = conn;

const company  = new mongoose.Schema({
    name: {type: String},
    phone: {type: String},
    companyName: {type: String},
    companyEmail: {type: String},
    companySize: {type: Number},
});

module.exports = mongoose.model("company", company)