import './App.css'
import cuvetteLogo from "./assets/cuvette.svg"
import { OuterContainer } from './Components/OuterContainer'

function App() {

  return (
    <div className='h-full w-full'>
      <div className='absolute top-0 left-0 z-60'>
        <img src={cuvetteLogo} className='mt-8 ml-10 w-40' alt='Cuvette Logo'/>
      </div>
      <div className='h-full w-full absolute left-0 top-0'>
        <OuterContainer />
      </div>
      
    </div>
  )
}

export default App
