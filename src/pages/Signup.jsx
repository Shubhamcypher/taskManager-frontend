import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'



const Signup = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state)=>state.auth?.isLoggedIn)

  if(isLoggedIn === true)
    navigate('/')

  const [data, setData] = useState({username:'', email:'',password:''})

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setData({...data,[name]:value})
  }

  const handleSubmit = async()=>{
    try {
      if(data.username==='',data.email==='',data.password==='')
        alert("All fields are required")
      else{
        const res = await axios.post('http://localhost:8000/api/v1/sign-in', data);
        console.log(res);
        alert("Signin Successful")
        navigate('/login')
      }
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.message)
    }
  }
  return (
    <div className=' h-[98vh] bg-gray-800 flex items-center justify-center'>
        <div className='p-4 w-2/6 rounded bg-gray-700'>
            <div className='font-bold text-2xl mb-2'>Signup</div>
            <input type='text' name='username' value={data.username} placeholder='username' onChange={handleChange} className='w-full px-3 py-2 my-3 text-gray-200 rounded bg-gray-600'/>
            <input type='text' name='email' value={data.email} placeholder='email' onChange={handleChange} className='w-full px-3 py-2 my-3 text-gray-200 rounded bg-gray-600'/>
            <input type='password' name='password' value={data.password} placeholder='password' onChange={handleChange} className='w-full px-3 py-2 my-3 text-gray-200 rounded bg-gray-600'/>
            <div className='flex justify-between items-center'>
                <button className='text-lg p-2 mt-2 bg-blue-600 rounded hover:scale-110 hover:bg-blue-800 transition-all duration-300' onClick={handleSubmit}>
                  Sign up
                </button>
                <Link to="/login" className='text-gray-500 hover:text-gray-300 transition-all duration-300'>Having an account? Login </Link>
            </div>
        </div>
    </div>
  )
}

export default Signup