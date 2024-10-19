let express = require("express");
let app = express();
let cors = require("cors");
let nodemailer = require("nodemailer");
let { newCompany } = require('./database')
let jwt = require('jsonwebtoken')
const path = require('path')
require("dotenv").config({path: path.resolve(__dirname, '.env')})

app.use(cors());
app.use(express.json())


var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: '153sahilnigam@gmail.com',
    pass: process.env.gmailPass
  }
});

let OTPHolder = {

}

app.post('/signUp', async (req, res) => {
    let createComp = await newCompany(req.body.company)
    if(createComp){
      let emailOTP = Math.floor(100000 + Math.random() * 900000)
      let mobileOTP = Math.floor(100000 + Math.random() * 900000)
      OTPHolder[req.body.company.companyEmail] = {
        'mobile': mobileOTP,
        'email': emailOTP
      }
      const emailInfo = await transporter.sendMail({
        from: '"Cuvette Job Portal"', // sender address
        to: req.body.company.companyEmail, // list of receivers
        subject: "Email OTP For The Cuvette Job Portal", // Subject line, // plain text body
        html: `
            <span style="font-size: 20px;"> Your Desired OTP is ${emailOTP}</span>
        `, // html body
      });
      const mobileInfo = await transporter.sendMail({
        from: '"Cuvette Job Portal"', // sender address
        to: req.body.company.companyEmail, // list of receivers
        subject: "Mobile OTP For The Cuvette Job Portal", // Subject line, // plain text body
        html: `
            <span style="font-size: 20px;"> Your Desired OTP is ${mobileOTP}</span>
        `, // html body
      });
      console.log("Message sent: %s", mobileInfo.messageId);
      console.log("Message sent: %s", emailInfo.messageId);
      res.send({
        'success': true,
      })
    }
    else{
      res.send({'success': false})
    }
})

app.listen(3000, () => {
  console.log("Server Listening");
});
