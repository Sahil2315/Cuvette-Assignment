
import personSVG from "../assets/person.svg"
import groupsSVG from "../assets/groups.svg"
import mailSVG from "../assets/mail.svg"
import phoneSVG from "../assets/phone.svg"
import { useEffect, useState } from "react"
import { baseAPI_URL } from "../API"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    let [name, setName] = useState<string>("")
    let [phone, setPhone] = useState<string>("")
    let [companyName, setCName] = useState<string>("")
    let [email, setEmail] = useState<string>("")
    let [empSize, setSize] = useState<number>(0)
    let [tokenGen, setTokenGen] = useState(false)
    let navigate = useNavigate()

    async function submitterFunc() {
        if(name == "" || (phone.length != 10 || (/^\d+$/.test(phone) == false) || companyName == "" || email == "" || empSize == 0)){
            alert("Invalid Details!\nPlease make Sure Each and Every Input is Provided.\nAlso Check for Red Input boxes and provide correct format Input.")
            return
        }
        let request = await fetch( baseAPI_URL + '/signUp', {
            'method': 'POST', 
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                'company': {
                    "name": name,
                    "phone": phone,
                    "companyName": companyName,
                    "companyEmail": email,
                    "companySize": empSize
                }
            })
        })
        let response = await request.json()
        if(response.success){
            setTokenGen(true)
        }
        else{
            alert("Failed to Register the Company")
            return
        }
        // navigate(-1)
        // setTimeout(() => {
        // }, 200)
    }
    useEffect(()=> {
        if (tokenGen){
            console.log("reached here")
            navigate('/verify', {replace: true})
            localStorage.setItem("email", email)
            localStorage.setItem("name", name)
        }
    }, [tokenGen])
    
  return (
    <div className="pt-20 h-full w-full flex flex-row items-center">
        <div className="flex-1">
            <p className="text-2xl px-32">Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
        </div>
        <div className="flex flex-row w-[1000px] justify-center">
            <div className="flex flex-col items-center border-2 p-6 border-blue-600 rounded-xl">
                <span className="text-4xl font-semibold">Sign Up</span>
                <span className="mt-4">Lorem Ipsum is simply dummy text</span>
                <div className="border-2 h-[60px] px-4 w-[530px] rounded-lg border-gray-200 bg-neutral-100 flex flex-row items-center mt-8">
                    <img src={personSVG} className="w-[20px]" />
                    <input defaultValue={name} onChange={((e) => {setName(e.target.value)})} type="text" className="flex-1 placeholder-slate-700 text-xl ml-4 bg-neutral-100 border-none outline-none" placeholder="Name"/>
                </div>
                <div className={`border-2 h-[60px] px-4 w-[530px] rounded-lg border-gray-200 bg-neutral-100 flex flex-row items-center mt-4 ${ phone.length == 0 || phone.length == 10 && /^\d+$/.test(phone) ? 'border-gray-200' : 'border-red-500'}`}>
                    <img src={phoneSVG} className="w-[20px]" />
                    <input type="text" pattern="[0-9]" defaultValue={phone} onChange={(e) => {setPhone(e.target.value)}} className="flex-1 placeholder-slate-700 text-xl ml-4 bg-neutral-100 border-none outline-none" placeholder="Phone no."/>
                </div>
                <div className="border-2 h-[60px] px-4 w-[530px] rounded-lg border-gray-200 bg-neutral-100 flex flex-row items-center mt-4">
                    <img src={personSVG} className="w-[20px]" />
                    <input type="text" defaultValue={companyName} onChange={(e) => {setCName(e.target.value)}} className="flex-1 placeholder-slate-700 text-xl ml-4 bg-neutral-100 border-none outline-none" placeholder="Company Name"/>
                </div>
                <div className={`border-2 h-[60px] px-4 w-[530px] rounded-lg border-gray-200 bg-neutral-100 flex flex-row items-center mt-4 ${email.length == 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'border-red-500'}`}>
                    <img src={mailSVG} className="w-[20px]" />
                    <input type="text" defaultValue={email} onChange={(e) => {setEmail(e.target.value)}} className="flex-1 placeholder-slate-700 text-xl ml-4 bg-neutral-100 border-none outline-none" placeholder="Company Email"/>
                </div>
                <div className="border-2 h-[60px] px-2 w-[530px] rounded-lg border-gray-200 bg-neutral-100 flex flex-row items-center mt-4">
                    <img src={groupsSVG} className="w-[35px]" />
                    <input type="number"  defaultValue={empSize} onChange={(e) => {setSize(parseInt(e.target.value))}} className="flex-1 placeholder-slate-700 text-xl ml-2 bg-neutral-100 border-none outline-none" placeholder="Employee Size"/>
                </div>
                <div className="flex flex-col items-center my-4 leading-5">
                    <span>By clicking on Proceed you will accept our</span>
                    <span ><a className="text-blue-600 font-semibold" href="#">Terms</a> & <a className="text-blue-600 font-semibold" href="#">Conditions</a></span>
                </div>
                <button onClick={submitterFunc} className="w-full bg-blue-500 py-2 text-xl text-white font-semibold rounded-lg">Proceed</button>
            </div>
        </div>
        <span className="absolute top-0 right-0 mr-20 mt-10 text-xl">
            <a href="#">Contact</a>
        </span>
    </div>
  )
}
