import { useEffect, useState } from "react"
import { baseAPI_URL } from "../API"

export const Interviews = ({opened, setOpened}: {opened: boolean,setOpened: (opened: boolean) => void}) => {
    let [interviews, setInterviews] = useState([])
    useEffect(() => {
        async function Intitialize(){
            let request = await fetch( baseAPI_URL + '/getInterviews', {
                'method': 'POST', 
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify({
                    "email": localStorage.getItem('email')
                })
            })
            let response = await request.json()
            if(response.success){
                setInterviews(response.list)
            }
        }
        Intitialize()
    }, [])
  return (
    <div className="h-full w-full p-8 ">
        <button onClick={() => {setOpened(true)}} className="bg-blue-600 py-1 px-4 text-white rounded-lg text-xl">Create Interview</button>
        <div className="mt-8">
            {
                interviews.map((item, index) => {
                    return(
                        <div className="flex flex-row items-center mt-2 text-xl bg-slate-200 rounded-lg py-2 pl-4 w-full">
                            <span>{item.jobTitle}</span>
                            <span className="ml-8">Experience - {`${parseInt(item.experience) - 1} - ${parseInt(item.experience)} Years`}</span>
                            <span className="ml-12">Last Date - {item.endDate.slice(0, 10)}</span>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
