import { useState } from "react"
import checkCircle from "../assets/checkCircle.svg"
import mailSVG from "../assets/mail.svg"
import phoneSVG from "../assets/phone.svg"



export const SignUp2 = () => {
    let [emailOTP, setEmail] = useState("")
    let [mobileOTP, setMobile] = useState("")
    
  return (
    <div className="pt-20 h-full w-full flex flex-row items-center">
        <div className="flex-1">
            <p className="text-2xl px-32">Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
        </div>
        <div className="flex flex-row w-[1000px] justify-center">
            <div className="flex flex-col items-center border-2 p-6 border-blue-600 rounded-xl">
                <span className="text-4xl font-semibold">Sign Up</span>
                <span className="mt-4">Lorem Ipsum is simply dummy text</span>
                <div className="border-2 h-[60px] px-4 w-[530px] rounded-lg border-gray-200 bg-neutral-100 flex flex-row items-center mt-4">
                    <img src={mailSVG} className="w-[20px]" />
                    <input type="text" defaultValue={emailOTP} onChange={(e) => {setEmail(e.target.value)}} className="flex-1 placeholder-slate-700 text-xl ml-4 bg-neutral-100 border-none outline-none" placeholder="Email OTP"/>
                    <img src={checkCircle} alt="" />
                </div>
                <button className="w-full bg-blue-500 py-1 text-xl text-white font-semibold rounded-lg mt-2">Verify</button>
                <div className="border-2 h-[60px] px-4 w-[530px] rounded-lg border-gray-200 bg-neutral-100 flex flex-row items-center mt-4">
                    <img src={phoneSVG} className="w-[20px]" />
                    <input type="text" defaultValue={mobileOTP} onChange={(e) => {setMobile(e.target.value)}} className="flex-1 placeholder-slate-700 text-xl ml-4 bg-neutral-100 border-none outline-none" placeholder="Mobile OTP"/>
                    <img src={checkCircle} alt="" />
                </div>
                <button className="w-full bg-blue-500 py-1 text-xl text-white font-semibold rounded-lg mt-2">Verify</button>
            </div>
        </div>
        <span className="absolute top-0 right-0 mr-20 mt-10 text-xl">
            <a href="#">Contact</a>
        </span>
    </div>
  )
}

// if(name == "" || (phone.length != 10 || (/^\d+$/.test(phone) == false) || companyName == "" || email == "" || empSize == 0)){
//     alert("Invalid Details!\nPlease make Sure Each and Every Input is Provided.\nAlso Check for Red Input boxes and provide correct format Input.")
// }

// let request = await fetch( baseAPI_URL + '/signUp', {
//     'method': 'POST', 
//     'headers': {
//         'Content-Type': 'application/json'
//     },
//     'body': JSON.stringify({
//         name: name,
//         phone: phone,
//         companyName: companyName,
//         companyEmail: email,
//         companySize: empSize
//     })
// })
// let response = await request.json()
// if(response.success){
    
// }