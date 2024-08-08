import React from 'react'
import Sidebar from '../components/Home/Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className='lg:flex lg:h-[96vh] gap-4 space-y-10 lg:space-y-0 '>
        <div className=' w-3/8 border-2 border-gray-300 rounded-xl p-4 flex flex-col justify-between'><Sidebar/></div>
        <div className='w-5/6 border-2 border-gray-500 rounded-xl p-4' >
          <Outlet/>
        </div>
    </div>
  )
}

export default Home;