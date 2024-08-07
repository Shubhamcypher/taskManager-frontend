import React, { useEffect, useState } from 'react'
import Card from '../components/Home/Card'
import axios from 'axios'

const CompletedTasks = () => {
  const [userData, setUserData] = useState()
  const headers = {
    id:localStorage.getItem('id'),
    authorization:`Bearer ${localStorage.getItem('token')}`

}
  useEffect(() => {
    const fetch = async()=>{
      const res = await axios.get('https://task-manager-psi-sage.vercel.app/api/v2/get-completed-tasks',{headers},{
        headers: {
          'Access-Control-Request-Headers': 'Content-Type'
        }
      })
      setUserData(res.data.data);
      
  }
    fetch();
  }, [userData])
  return (
    <div>
      <p className='font-bold text-2xl text-green-600'>Completed Tasks</p>
      <Card home={"false"} data={userData}/>
    </div>
  )
}

export default CompletedTasks