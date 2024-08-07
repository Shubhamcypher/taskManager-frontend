import React, { useEffect } from 'react';
import Home from './pages/Home.jsx';
import { Routes,Route,useNavigate} from 'react-router-dom';
import AllTasks from './pages/AllTasks.jsx'
import ImportantTasks from './pages/ImportantTasks.jsx'
import CompletedTasks from './pages/CompletedTasks.jsx'
import IncompletedTasks from './pages/IncompletedTasks.jsx'
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import {useSelector, useDispatch} from 'react-redux'
import { authActions } from './store/auth.js';




 const App = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=>state.auth?.isLoggedIn)

  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login())
    }
    else if(isLoggedIn === false)
    navigate('/signup')
  },[])
  
  
  return (
      <div className='bg-gray-800 text-white p-4 relative'>
        <Routes>
          <Route exact path="/" element={<Home/>} >
            <Route index element={<AllTasks/>} />
            <Route path="/important" element={<ImportantTasks/>} />
            <Route path="/completed" element={<CompletedTasks/>} />
            <Route path="/incompleted" element={<IncompletedTasks/>} />
          </Route>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
        </Routes>
      </div>
  );
}

export default App;
