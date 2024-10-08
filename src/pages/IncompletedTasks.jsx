import React, { useEffect, useState } from 'react'
import Card from '../components/Home/Card'
import axios from 'axios'

const IncompletedTasks = () => {
  const [userData, setUserData] = useState()
  const headers = {
    id:localStorage.getItem('id'),
    authorization:`Bearer ${localStorage.getItem('token')}`

}
  useEffect(() => {
    const fetch = async()=>{
      const res = await axios.get('https://task-manager-psi-sage.vercel.app/api/v2/get-incomplete-tasks',{headers},{
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
      <p className='font-bold text-2xl text-red-600'>Incomplete Tasks</p>
      <Card home={"false"} data={userData}/>
    </div>
  )
}

export default IncompletedTasks