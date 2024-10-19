const mongoose = require('mongoose')
const path = require('path')
require("dotenv").config({path: path.resolve(__dirname, '.env')})
mongoose.connect(process.env.Mongo_URL)
const company = require('./models/company')
const jobs = require('./models/jobs')


async function newCompany (obj){
    try{
        const compInstance = await new company(obj)
        compInstance.save()
        return true
    }
    catch(err){
        console.log(err)
        return false
    }
}

async function getInterviews(email){
    let interviewList = await jobs.find({
        'companyEmail': email
    })
    return interviewList
}
async function newInterview (obj){
    try{
        const jobInstance = await new jobs(obj)
        jobInstance.save()
        return true
    }
    catch(err){
        console.log(err)
        return false
    }
}


module.exports = {newCompany, getInterviews, newInterview}
