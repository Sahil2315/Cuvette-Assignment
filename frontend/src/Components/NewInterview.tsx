import circleLogo from "../assets/ball.svg"


export const NewInterview = () => {
  return (
    <div className="flex flex-col h-full w-full justify-center px-10">
        <div className="flex flex-row mx-8 items-center mt-6">
            <span className="text-3xl text-end w-[300px]">Job Title</span>
            <input type="text" placeholder="Enter Job Title" className=" px-6 border-2 ml-12 w-[550px] text-xl py-2 rounded-lg" />
        </div>
        <div className="flex flex-row mx-8 mt-6">
            <span className="text-3xl text-end w-[300px] mt-2">Job Description</span>
            <textarea rows={6} placeholder="Enter Job Description" className=" px-6 border-2 ml-12 w-[550px] text-xl py-2 rounded-lg" />
        </div>
        <div className="flex flex-row mx-8 items-center mt-6">
            <span className="text-3xl text-end w-[300px]">Experience Level</span>
            <select className="px-6 border-2 ml-12 w-[550px] text-xl py-2 rounded-lg cursor-pointer" >
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
            <div className=" px-6 border-2 ml-12 w-[550px] text-xl py-4 rounded-lg" >
                <div className="text-md items-center h-[38px] pb-1 rounded-xl border w-max px-2 flex flex-row">
                    <img className="h-[22px] opacity-80 mt-1" src={circleLogo}/>
                    <span className="text-slate-400 ml-1">xyz@gmail.com</span>
                    <svg className="ml-2 mt-1 opacity-80" height="13" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 1L1 11" stroke="#919191" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1 1L11 11" stroke="#919191" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                </div>
            </div>
        </div>
        <div className="flex flex-row mx-8 items-center mt-6">
            <span className="text-3xl text-end w-[300px]">End Date</span>
            <input type="text" onFocus={(e) => {e.target.type = "date"}} onBlur={(e) => {e.target.type = "text"}} placeholder="Select a Date" className="cursor-pointer px-6 border-2 ml-12 w-[550px] text-xl py-2 rounded-lg" />
        </div>
        <div className="w-[850px] flex flex-row justify-end ml-20 mt-10">
            <button className="bg-blue-600 w-max px-8 py-1 rounded-lg text-white text-xl">Send</button>
        </div>
    </div>
  )
}
