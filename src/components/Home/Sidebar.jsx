import React, { useEffect, useState } from 'react'
import { FcSalesPerformance } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { FcInfo } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth';
import axios from 'axios'


const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async()=>{
        localStorage.clear("id")
        localStorage.clear("token")
        dispatch(authActions.logout())
        alert("Logged out successfully");
        navigate('/login')
    }
    const data = [
        {
            "title":"All Tasks",
            "icon":<FcSalesPerformance />,
            "link":"/"
        },
        {
            "title":"Important Tasks",
            "icon":<FcInfo />,
            "link":"/important"
        },
        {
            "title":"Completed Tasks",
            "icon":<FcApproval />,
            "link":"/completed"
        },
        {
            "title":"Incomplete Tasks",
            "icon":<FcCancel />,
            "link":"/incompleted"
        },

    ]
    const [userData, setUserData] = useState({})
    const headers = {
        id:localStorage.getItem('id'),
        authorization:`Bearer ${localStorage.getItem('token')}`
    }
    useEffect(() => {
      const fetch = async()=>{
        const res = await axios.get('https://task-manager-psi-sage.vercel.app/api/v2/get-all-tasks',{headers},{
            headers: {
              'Access-Control-Request-Headers': 'Content-Type'
            }
          })
        setUserData(res.data.data);
    }
      fetch();
    }, [])
    
  return (
    <>
        {userData && (
            <div>
            <h2 className='text-xl font-semibold'>{userData.username}</h2>
            <h6 className='text-blue-400'>{userData.email}</h6>
            <br/>
            <hr/>
        </div>)}
        <div className='inline-block'>
            {data.map((items,i)=>(
                <Link
                 to={items.link}
                 key={i}
                className='my-2 flex items-center gap-2 p-1 rounded-md cursor-pointer text-xl hover:bg-gray-500 transition-all duration-100'>
                    {items.icon}
                    {items.title}
                </Link>
            ))}
        </div>
        <div className=''>
            <button onClick={handleLogout} className='bg-red-500 w-full rounded-md p-3 text-gray-300 mb-8 hover:bg-red-600 hover:font-bold'>Logout</button>
        </div>
    </>
    
  )
}

export default Sidebar