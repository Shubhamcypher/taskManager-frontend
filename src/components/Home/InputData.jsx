import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ImCross } from "react-icons/im";

const InputData = ({InputDiv, setInputDiv, updatedTaskData, setUpdatedTaskData}) => {

    const headers = {
        id:localStorage.getItem('id'),
        authorization:`Bearer ${localStorage.getItem('token')}`
    
    }

    const [taskData, setTaskData] = useState({title:'', description:'', due:''})    
    const handleChange = (e)=>{
        const {name, value} = e.target
        setTaskData({...taskData, [name]: value})
    }

    const handleSubmit = async()=>{
        if(taskData.title ===''||taskData.description ===''||taskData.due ===''){
            console.log(taskData);
            alert('All fields are mandatory')
        }
        else{
            const res = await axios.post('https://task-manager-psi-sage.vercel.app/api/v2/create-task',taskData,{headers},{
                headers: {
                  'Access-Control-Request-Headers': 'Content-Type'
                }
              })
            setTaskData({title:'', description:'', due:''})
            setInputDiv('hidden')

        }
    }
    
    const handleUpdate = async()=>{
        if(taskData.title ===''||taskData.description ===''||taskData.due ===''){
            console.log(taskData);
            alert('All fields are mandatory')
        }
        else{
            await axios.put(`https://task-manager-psi-sage.vercel.app/api/v2/update-task/${updatedTaskData.id}`,taskData,{headers},{
                headers: {
                  'Access-Control-Request-Headers': 'Content-Type'
                }
              })
            setUpdatedTaskData({
                id:'',
                title:'',
                description:'',
                due:''
            })
            setTaskData({
                title:'',
                description:'',
                due:''
            })
            setInputDiv('hidden')

        }
    }

    useEffect(() => {
      setTaskData({title:updatedTaskData.title, description:updatedTaskData.description, due:updatedTaskData.due.slice(0,10)})
    }, [updatedTaskData])
    
  return (
    <>
        <div className={`${InputDiv} fixed bg-gray-900 top-0 left-0 opacity-50 h-screen w-full `}>
        </div>
        <div className={`${InputDiv} fixed  top-0 left-0 flex items-center justify-center h-screen w-full` }>
            <div className='lg:w-3/6 bg-gray-500 p-4 rounded-lg' style={{backgroundImage: 'url(/input.jpg)', backgroundSize: 'cover'}}>
                <div className='flex justify-end mb-4'>
                    <button className=' hover:scale-125 hover:text-red-400 text-xl transition-all duration-300' onClick={()=>{
                        setInputDiv('hidden')
                        setTaskData({
                            title:'',
                            description:'',
                            due:''
                        })
                        setUpdatedTaskData({
                            id:'',
                            title:'',
                            description:'',
                            due:''
                        })
                    }}>
                <ImCross /></button>
                </div>
                <p className='font-bold text-2xl text-gray-700 mb-6'>Add task details</p>
                <input type="text" placeholder='Title' name='title' value={taskData.title} onChange={handleChange} className='p-3 rounded-xl w-full text-black bg-gray-700'/>
                <textarea name='description' placeholder='Add your task details...' cols={30} rows={10} value={taskData.description} onChange={handleChange} className='p-3 rounded-lg w-full text-black mt-4 bg-gray-700'  ></textarea >
                <div className='flex flex-col justify-center items-center w-1/3 bg-black p-4 rounded-xl ml-8'>
                <p  className='text-red-900 font-bold w-auto'>Deadline(mm/dd/yyyy):</p>
                <input type="date" name='due' value={taskData.due} onChange={handleChange} className='p-3 rounded-xl w-auto text-black mt-2 bg-blue-400' />
                </div>
                <div className='flex items-center justify-center'>
                    {updatedTaskData.id===""?
                    (<button className='bg-blue-500 p-2 rounded-lg mt-2 text-gray-200 font-semibold text-xl hover:scale-105 hover:bg-green-700 transition-all duration-300' onClick={handleSubmit}>Create</button>):
                    (<button className='bg-blue-500 p-2 rounded-lg mt-2 text-gray-200 font-semibold text-xl hover:scale-105 hover:bg-green-700 transition-all duration-300' onClick={handleUpdate}>Update</button>)
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default InputData