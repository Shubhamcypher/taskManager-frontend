import React from 'react'
import Sidebar from '../components/Home/Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex h-full gap-4'>
        <div className=' w-1/8 border-2 border-black rounded-xl p-4 flex flex-col justify-between lg:block sm:hidden'><Sidebar/></div>
        <div className='w-5/6 border-2 border-black rounded-xl p-4'>
          <Outlet/>
        </div>
    </div>
  )
}

export default Home;