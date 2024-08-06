import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {authActions} from '../store/auth'
import {useDispatch, useSelector} from 'react-redux'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state)=>state.auth?.isLoggedIn)

  if(isLoggedIn === true)
    navigate('/')

  const [data, setData] = useState({username:'',password:''})

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setData({...data,[name]:value})
  }

  const handleSubmit = async()=>{
    console.log("in submit");
    
    try {
      if(data.username===''|| data.password==='')
        alert("All fields are required")
      else{
        console.log("hello from login");
        
        console.log(data);
        const res = await axios.post('https://task-manager-psi-sage.vercel.app/api/v1/log-in',data);
           console.log(res);
           
        setData({username:'',password:''})
        localStorage.setItem("id", res.data.id)
        localStorage.setItem("token", res.data.token)
        dispatch(authActions.login())
        navigate('/')
      }
    } catch (error) {
      console.log("hi");
      
      console.log(error);
      alert(error.response.data.message)
    }
  }
  return (
    <div className=' h-[98vh] bg-gray-800 flex items-center justify-center'>
        <div className='p-4 w-2/6 rounded bg-gray-700'>
            <div className='font-bold text-2xl mb-2'>Log in</div>
            <input type='text' name='username' placeholder='username' value={data.username} onChange={handleChange} className='w-full px-3 py-2 my-3 text-gray-200 rounded bg-gray-600'/>
            <input type='password' name='password' placeholder='password' value={data.password} onChange={handleChange} className='w-full px-3 py-2 my-3 text-gray-200 rounded bg-gray-600'/>
            <div className='flex justify-between items-center'>
                <button className='text-lg p-2 mt-2 bg-blue-600 rounded hover:scale-110 hover:bg-blue-800 transition-all duration-300' onClick={handleSubmit}>Log in</button>
                <Link to='/signup' className='text-gray-500 hover:text-gray-300 transition-all duration-300'>Not having an account? Signup</Link>
            </div>
        </div>
    </div>
  )
}

export default Login