import React from 'react';
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { FcEmptyTrash } from "react-icons/fc";
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';

const Card = ({ home, setInputDiv, data, setUpdatedTaskData }) => {
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  const headers = {
    id:localStorage.getItem('id'),
    authorization:`Bearer ${localStorage.getItem('token')}`
    
}


const handleCompleteTask = async (id)=>{
  try {
    const res = await axios.patch(`https://task-manager-psi-sage.vercel.app/api/v2/update-completed-task/${id}`,{},{headers},{
      headers: {
        'Access-Control-Request-Headers': 'Content-Type'
      }
    })
  } catch (error) {
    console.log(error);
  }
}
const handleImportantTask = async (id)=>{
  try {
    const res=await axios.patch(`https://task-manager-psi-sage.vercel.app/api/v2/update-important-task/${id}`,{},{headers},{
      headers: {
        'Access-Control-Request-Headers': 'Content-Type'
      }
    })
  } catch (error) {
    console.log(error);
  }
}
const handleEditTask = async (id,title,description,due)=>{
  setInputDiv('block')
  setUpdatedTaskData({id:id, title:title, description:description, due:due})
}
const handleDeleteTask = async (id)=>{
  try {
    const res = await axios.delete(`https://task-manager-psi-sage.vercel.app/api/v2/delete-task/${id}`,{headers},{
      headers: {
        'Access-Control-Request-Headers': 'Content-Type'
      }
    })
    alert(res.data.message);
  } catch (error) {
    console.log(error);
  }
}



  return (
    <div className='grid grid-cols-3 gap-4 p-4 cursor-default'>
      {data && data.map((items, i) => (
        <div key={i} className='bg-gray-700 flex flex-col justify-between rounded-xl p-4 border relative'>
          <div className='absolute top-0 left-0 text-gray-100 bg-purple-500 text-lg rounded-lg m-1 p-1  font-semibold'>
            {formatDate(items.due)}
          </div>
          <div>
            <h3 className='text-xl font-bold mt-6'>{items.title}</h3>
            <p className='text-gray-400 my-2'>{items.description}</p>
          </div>
          <div className='mt-4 flex items-center justify-between'>
            {(items.completed === false)?(
              <button className='bg-red-500 p-2 rounded' onClick={()=>handleCompleteTask(items._id)}>Incomplete</button>
            ):(
              <button className='bg-green-500 p-2 rounded' onClick={()=>handleCompleteTask(items._id)}>Completed</button>
            )}
            <div className='text-white p-2 text-2xl w-1/2 flex justify-around'>
              
            {(items.important === true)?(
              <button onClick={()=>handleImportantTask(items._id)}><FcLike /></button>
            ):(
              <button onClick={()=>handleImportantTask(items._id)}><CiHeart /></button>
            )}

              


              { home === 'true' && (<button onClick={()=>handleEditTask(items._id,items.title,items.description,items.due)}><MdEdit /></button>)}
              <button onClick={()=>handleDeleteTask(items._id)}><FcEmptyTrash /></button>
            </div>
          </div>
        </div>
      ))}
      {home === "true" && (
        <div className='bg-gray-700 flex flex-col justify-center items-center rounded-xl p-4 border hover:scale-105 transition-all duration-300 cursor-pointer' onClick={()=>setInputDiv('fixed')}>
          <IoIosAddCircle className='text-5xl ' />
          <h2 className='text-xl mt-4'>Add Task</h2>
        </div>
      )}
    </div>
  );
}

export default Card;
