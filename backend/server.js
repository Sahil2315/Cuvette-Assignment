let express = require("express");
let app = express();
let cors = require("cors");
let nodemailer = require("nodemailer");
let { newCompany, getInterviews, newInterview } = require('./database')
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

app.get('/', (req, res) => {
  res.send({'success': true})
})

app.post('/tokenCheck', (req, res) => {
  try{
    let Object = jwt.verify(req.body.token, process.env.JWT_SECRET)
    res.send({
      'success': true,
      'name': Object.name,
      'email': Object.email
    })
  } 
  catch(err){
    res.send({'success': false})
  }
})

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
        from: '"Cuvette Job Portal"',
        to: req.body.company.companyEmail,
        subject: "Email OTP For The Cuvette Job Portal",
        html: `
            <span style="font-size: 20px;"> Your Desired OTP is ${emailOTP}</span>
        `,
      });
      const mobileInfo = await transporter.sendMail({
        from: '"Cuvette Job Portal"',
        to: req.body.company.companyEmail,
        subject: "Mobile OTP For The Cuvette Job Portal",
        html: `
            <span style="font-size: 20px;"> Your Desired OTP is ${mobileOTP}</span>
        `,
      });
      res.send({
        'success': true,
      })
    }
    else{
      res.send({'success': false})
    }
})

app.post('/emailVerify', (req, res) => {
  if(req.body.emailOTP == OTPHolder[req.body.email].email){
    res.send({'success': true})
  }
  else{
    res.send({'success': false})
  }
})

app.post('/mobileVerify', (req, res) => {
  if(req.body.mobileOTP == OTPHolder[req.body.email].mobile){
    res.send({'success': true})
  }
  else{
    res.send({'success': false})
  }
})

app.post('/tokenGen', (req, res) => {
  let userToken = jwt.sign({email: req.body.email, name: req.body.name}, process.env.JWT_SECRET)
  res.send({
    'success': true,
    'token': userToken
  })
})

app.post('/getInterviews', async (req, res) => {
  let interList = await getInterviews(req.body.email)
  res.send({
    'success': true,
    'list': interList
  })
})

app.post('/newInterview', async (req, res) => {
  let response = await newInterview(req.body)
  if(response){
    for(let i=0; i<req.body.candidates.length; i++){
      try{
        const emailInfo = await transporter.sendMail({
          from: '"Cuvette Job Portal"',
          to: req.body.candidates[i], 
          subject: "Job Offer from the Cuvette Job Portal", 
          html: `
              <span style="font-size: 20px;">Congratulations!<br>You have been selected as a Candidate for a Job Opportunity by ${req.body.companyEmail} Position - ${req.body.jobTitle} Experience Level: ${parseInt(req.body.experience) -1} - ${parseInt(req.body.experience) } Years</span>
          `, 
        });
      }
      catch(err) {
        continue
      }
    }
    res.send({'success': true})
  }
  else{
    res.send({'success': false})
  }
})

app.listen(3000, () => {
  console.log("Server Listening");
});
