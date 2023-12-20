import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message,setMessage]= useState();

  async function login(e) {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials:'include',
    })

    const data = await response.json();
    if (response.ok) {
      navigate('/');
    } else {
       setMessage('Wrong Credentials')
    }

  }

  setTimeout(()=>{
    setMessage(null);
  },2000)

  return (
    <div className='h-screen' style={{backgroundImage:"url('https://i.redd.it/haeyjbjnb9541.jpg')",backgroundRepeat:"no-repeat" ,backgroundSize:"cover"}}>
      <Navbar/>
      {message?<>
          <div class="alert alert-warning text-center w-2/6 mx-auto text-lg absolute left-0 right-0" role="alert">
            {message}
          </div>
            </>:<></>
      }
       <div className='mx-auto w-1/2 h-1/2 my-20 bg-white text-center rounded overflow-hidden'>

        <div className='mt-10'>
          <form className='mx-10' onSubmit={(e) => { login(e) }}>

            <h2 className='text-3xl leading-8 my-10'>Login</h2>

            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
              <label for="floatingPassword">Password</label>
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-6">
              Submit
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login