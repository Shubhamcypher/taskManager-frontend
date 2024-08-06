import React, { useEffect, useState } from 'react'
import Card from '../components/Home/Card'
import { IoIosAddCircle } from "react-icons/io";
import InputData from '../components/Home/InputData';
import axios from 'axios';


const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden")
  const [userData, setUserData] = useState({})
  const [updatedTaskData, setUpdatedTaskData] = useState({
    id:'',
    title:'',
    description:'',
    due:''
  })
  const headers = {
    id:localStorage.getItem('id'),
    authorization:`Bearer ${localStorage.getItem('token')}`

}
  useEffect(() => {
    const fetch = async()=>{
      const res = await axios.get('https://task-manager-psi-sage.vercel.app/api/v2/get-all-tasks',{headers})
      setUserData(res.data.data);
  }
    fetch();
  }, [userData])
  return (
    <div>
      <div className='w-full flex justify-end px-4 py-2'>
        <button onClick={()=>setInputDiv('fixed')}>
          <IoIosAddCircle className='text-4xl text-gray-500 hover:text-green-500 hover:scale-125  transition-all duration-300 '/>
        </button>
      </div>
      <button>
        <Card home ={"true"} setInputDiv={setInputDiv} data={userData.tasks} setUpdatedTaskData={setUpdatedTaskData}/>
      </button>
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} updatedTaskData={updatedTaskData} setUpdatedTaskData={setUpdatedTaskData}/>
    </div>
  )
}

export default AllTasks