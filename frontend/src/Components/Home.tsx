import { useEffect, useState } from "react"
import ballLogo from "../assets/ball.svg"
import homeLogo from "../assets/home.svg"
import InnerContainer from "./InnerContainer"
import { useNavigate } from "react-router-dom"

const Home = () => {
    let[name, setName] = useState<string>("Your Name")
    useEffect(() => {
        setName(localStorage.getItem('name') as string)
    }, [])
    let navigate = useNavigate()
    function logOut (){
        localStorage.clear()
        navigate('/')
    }
  return (
    <div className="h-full w-full pt-24">
        <div className="h-full flex flex-row w-full border-t-4">
            <div className="border-r-4 flex flex-row items-start justify-center h-full w-[100px]">
                <a href="#"><img className="mt-10" src={homeLogo}/></a>
            </div>
            <div className="flex-1">
                <InnerContainer />
            </div>
        </div>
        <div className="flex flex-row items-center py-3 absolute mt-4 mr-8 top-0 right-0 ">
            <span className="text-2xl"> <a href="#">Contact</a> </span>
            <div className="flex flex-row px-4 rounded-md py-1 border-2  items-center ml-8">
                <img className="h-[23px]" src={ballLogo} />
                <select className="ml-4 text-xl pr-4 outline-none cursor-pointer">
                    <option value="0">{name}</option>
                </select>
                <button onClick={() => logOut()} className="text-white py-1 px-2 rounded-lg ml-4 bg-red-500">Log Out</button>
            </div>
        </div>
    </div>
  )
}

export default Home