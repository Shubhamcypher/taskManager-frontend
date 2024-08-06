import React, { useEffect, useState } from 'react'
import Card from '../components/Home/Card'
import axios from 'axios'

const ImportantTasks = () => {
  const [userData, setUserData] = useState()
  const headers = {
    id:localStorage.getItem('id'),
    authorization:`Bearer ${localStorage.getItem('token')}`

}
  useEffect(() => {
    const fetch = async()=>{
      const res = await axios.get('http://localhost:8000/api/v2/get-important-tasks',{headers})
      setUserData(res.data.data);
      
  }
    fetch();
  }, [userData])
  return (
    <div>
      <Card home={"false"} data={userData}/>
    </div>
  )
}

export default ImportantTasks