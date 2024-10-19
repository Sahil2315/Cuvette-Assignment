import { useState, KeyboardEvent, useEffect } from "react"
import circleLogo from "../assets/ball.svg"
import homeLogo from "../assets/home.svg"
import { baseAPI_URL } from "../API"


export const NewInterview = ({setOpened}: {setOpened: (opened: boolean) => void}) => {
    let [title, setTitle] = useState<string>("")
    let [desc, setDesc] = useState<string>("")
    let [exp, setExp] = useState<string>("0")
    let [candArr, setCand] = useState<string[]>(["xyz@gmail.com"])
    let [candFocussed, toggleFocus] = useState(false)
    let [currCandEmail, setCandEmail] = useState("")
    let [endDate, setED] = useState<string>("")

    function keyDetect(e: KeyboardEvent<HTMLInputElement>){
        if(e.key != "," && e.key != "Enter"){
            setCandEmail((e.target as HTMLInputElement).value)
        }
        else{
            if(currCandEmail != "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currCandEmail)){
                if (candArr[0] == "xyz@gmail.com"){
                    (e.target as HTMLInputElement).value = ""
                    setCand([currCandEmail])
                    setCandEmail("")
                    
                }
                else{
                    (e.target as HTMLInputElement).value = ""
                    setCand([...candArr, currCandEmail])
                    setCandEmail("")
                    
                }
            }
            else{
                (e.target as HTMLInputElement).value = ""
                setCandEmail("")
            }
        }
    }
    useEffect(() => {
        if(candArr.length == 0){
            setCand(["xyz@gmail.com"])
        }
    }, [candArr])

    let today = new Date()

    async function submitter(){
        if(title =="" || desc=="" || exp=="0" || endDate=="" || candArr[0] == "xyz@gmail.com"){
            alert("Fill all the Details Carefully\nNo Details can be Left Blank")
        }
        else{
            let request = await fetch( baseAPI_URL + '/newInterview', {
                'method': 'POST', 
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify({
                    'jobTitle': title,
                    'jobDesc': desc,
                    'experience': exp,
                    'candidates': candArr,
                    'endDate': new Date(endDate),
                    'companyEmail': localStorage.getItem('email')
                })
            })
            let response = await request.json()
            if(response.success){
                alert("New Interview Created Successfully")
                setOpened(false)
            }
        }
    }

  return (
    <div className="flex flex-col h-full w-full justify-center px-10">
        <button onClick={() => setOpened(false)} className="absolute top-[140px] left-[27px]">
            <img src={homeLogo} />
        </button>
        <div className="flex flex-row mx-8 items-center mt-6">
            <span className="text-3xl text-end w-[300px]">Job Title</span>
            <input defaultValue={title} onChange={(e) => {setTitle(e.target.value)}} type="text" placeholder="Enter Job Title" className=" px-6 border-2 ml-12 w-[550px] text-xl py-2 rounded-lg" />
        </div>
        <div className="flex flex-row mx-8 mt-6">
            <span className="text-3xl text-end w-[300px] mt-2">Job Description</span>
            <textarea defaultValue={desc} onChange={(e) => {setDesc(e.target.value)}} rows={6} placeholder="Enter Job Description" className=" px-6 border-2 ml-12 w-[550px] text-xl py-2 rounded-lg" />
        </div>
        <div className="flex flex-row mx-8 items-center mt-6">
            <span className="text-3xl text-end w-[300px]">Experience Level</span>
            <select defaultValue={exp} onChange={(e) => {setExp(e.target.value)}} className="px-6 border-2 ml-12 w-[550px] text-xl py-2 rounded-lg cursor-pointer" >
                <option value="0">Select Experience Level</option>
                <option value="1">0 - 1 Years</option>
                <option value="2">1 - 2 Years</option>
                <option value="3">2 - 3 Years</option>
                <option value="4">3 - 4 Years</option>
                <option value="5">4 - 5 Years</option>
                <option value="6">5 - 6 Years</option>
                <option value="7">{" > 6 Years"}</option>
            </select>
        </div>
        <div className="flex flex-row mx-8 items-center mt-6">
            <span className="text-3xl text-end w-[300px]">Add Candidate</span>
            <div onClick={() => toggleFocus(true)} className="cursor-pointer px-6 border-2 ml-12 w-[550px] text-xl py-4 rounded-lg" >
                {
                    candArr.map((item, index: number) => {
                        return(
                            <button onClick={() => {setCand([...candArr.slice(0, index), ...candArr.slice(index+1)])}} key={index} className="text-md items-center h-[38px] pb-1 rounded-xl border w-max px-2 flex flex-row">
                                <img className="h-[22px] opacity-80 mt-1" src={circleLogo}/>
                                <span className="text-slate-400 ml-1">{item}</span>
                                <svg className="ml-2 mt-1 opacity-80" height="13" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 1L1 11" stroke="#919191" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M1 1L11 11" stroke="#919191" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        )
                    })
                }
                <input defaultValue={currCandEmail} onKeyUp={(e) => {keyDetect(e)}} onBlur={() => toggleFocus(false)} placeholder="Enter Email Here" className={candFocussed ? 'border-2 py-1 px-2 rounded-lg mt-2' : 'hidden'} type="text" />
            </div>
        </div>
        <div className="flex flex-row mx-8 items-center mt-6">
            <span className="text-3xl text-end w-[300px]">End Date</span>
            <input onChange={(e) => {
                setED(e.target.value)
                e.target.type = "date"    
            }} defaultValue={endDate} type="text" min={`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`} onFocus={(e) => {e.target.type = "date"}} onBlur={(e) => {if(endDate == "") e.target.type="Text"}} placeholder="Select a Date" className="cursor-pointer px-6 border-2 ml-12 w-[550px] text-xl py-2 rounded-lg" />
        </div>
        <div className="w-[850px] flex flex-row justify-end ml-20 mt-10">
            <button onClick={submitter} className="bg-blue-600 w-max px-8 py-1 rounded-lg text-white text-xl">Send</button>
        </div>
    </div>
  )
}
