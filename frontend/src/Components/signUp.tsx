
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
    let [signing, setSigning] = useState(false)

    useEffect(() => {
        async function InitializeToken(){
             let token = localStorage.getItem("userToken")
             if(token && token != ""){
                let request = await fetch( baseAPI_URL + '/tokenCheck', {
                    'method': 'POST', 
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    'body': JSON.stringify({
                        'token': token
                    })
                })
                let response = await request.json()
                if(response.success){
                    localStorage.setItem('name', response.name)
                    localStorage.setItem('email', response.email)
                    navigate('/home', {replace: true})
                    console.log("Shaabash")
                }
                else{
                    localStorage.clear()
                }
             }
             else{
                return
             }
        }
        InitializeToken()
    }, [])

    async function submitterFunc() {
        if(name == "" || (phone.length != 10 || (/^\d+$/.test(phone) == false) || companyName == "" || email == "" || empSize == 0)){
            alert("Invalid Details!\nPlease make Sure Each and Every Input is Provided.\nAlso Check for Red Input boxes and provide correct format Input.")
            return
        }
        setSigning(true)
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
            setSigning(false)
            return
        }
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
            <div className="flex relative flex-col items-center border-2 p-6 border-blue-600 rounded-xl">
                <div className={`absolute h-full w-full top-0 left-0 backdrop-blur flex justify-center items-center bg-slate-700 bg-opacity-80 z-80 ${signing ? '' : 'hidden'}`}>
                    <svg aria-hidden="true" className="w-8 h-8 animate-spin text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#99BBFF"/>
                    </svg>
                    <span className="ml-4 text-xl text-rose-200">Waiting for the Verification Page</span>
                </div>
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
