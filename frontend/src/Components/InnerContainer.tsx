import { Route, Routes } from 'react-router-dom';
import { Interviews } from './Interviews';
import { NewInterview } from './NewInterview';
import { useState } from 'react';

const InnerContainer = () => {
  let [opened, setOpened] = useState(false)
  return (
    <div className='h-full w-full'>
      {
        opened ?  <NewInterview setOpened={setOpened}/> : <Interviews opened={opened} setOpened={setOpened}/>
      }
    </div>
  )
}

export default InnerContainer