import { useState } from "react"

export const Interviews = () => {
    let [interviews, setInterviews] = useState([])
  return (
    <div className="h-full w-full p-8">
        <button className="bg-blue-600 py-1 px-4 text-white rounded-lg text-xl">Create Interview</button>
        {
            interviews.map((item, index) => {
                return(
                    <div></div>
                )
            })
        }
    </div>
  )
}
