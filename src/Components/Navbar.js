import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {setUserInfo,userInfo} = useContext(UserContext)
  // const [email, setEmail] = useState();
  const navigate = useNavigate();
  const [color,setColor] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        // setEmail(userInfo.email);
        setUserInfo(userInfo);
        setColor('90, 147, 176')
      })
    })
  }, []);

  function logout(){
    fetch('http://localhost:8000/logout',{
      credentials:'include',
      method:"POST",
    })
    // setEmail(null);
    setUserInfo(null);
    navigate("/login")
  }

  const email = userInfo?.email;
  

  return (
    <div className='flex justify-between ' style={{backgroundColor:`rgba(${color})`}}>
      <div>
        <h1 className='mx-12 my-8 text-3xl font-semibold '>MyBlogs</h1>
      </div>
      <div>
        <ul className='flex'>
        <li className='mx-4 my-8 text-2xl font-medium hover:bg-white transition duration-400 rounded'><Link className='mx-1' to="/">Home</Link></li>
          {email ? <>
           <li className='mx-4 my-8 text-2xl font-medium hover:bg-white transition duration-400 rounded'><Link className='mx-1' to='/create'>Create Post <i class="ri-add-circle-line"></i></Link></li>
           <a className='mx-4 my-8 text-2xl font-medium hover:bg-white transition duration-400 rounded cursor-pointer' onClick={logout}>Logout</a>
           </> 
           :
            <>
              <li className='mx-4 my-8 text-2xl font-medium hover:bg-white transition duration-400 rounded'><Link className='mx-1' to="/signup">Signup</Link></li>
              <li className='mx-4 my-8 text-2xl font-medium hover:bg-white transition duration-400 rounded'><Link className='mx-1' to="/login">Login</Link></li>
            </>}
        </ul>
      </div>
    </div>
  )
}

export default Navbar