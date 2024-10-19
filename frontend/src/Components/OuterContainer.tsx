import { Route, Routes } from "react-router-dom"
import { Signup } from "./signUp"
import { SignUp2 } from "./SignUp2"
import Home from "./Home"

export const OuterContainer = () => {
  return (
    <div className="h-full w-full">
        <Routes>
            <Route path="/" Component={Signup} />
            <Route path="/verify" Component={SignUp2} />
            <Route path="/home" Component={Home} />
        </Routes>
    </div>
  )
}
