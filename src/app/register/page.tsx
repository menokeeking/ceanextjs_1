"use client"

import axios from 'axios';
import { FormEvent } from 'react';


function Registerpage() {

  const handleSubmit =  async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)

    try {
    //console.log(email,password,fullname)

    const res = await axios.post('/api/auth/signup', {
      email: formData.get('email'),
      password: formData.get('password'),
      fullname: formData.get('fullname'),
    });
    console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>SignUp</h1>
          <input 
            type="text" 
            placeholder="John Doe" 
            name="fullname" 
            className= "bg-zinc-800 text-white px-4 py-2 block mb-2" />
          <input 
            type="email" 
            placeholder="correo@dominio.ext" 
            name="email" 
            className= "bg-zinc-800 text-white px-4 py-2 block mb-2" />
          <input 
            type="password" 
            placeholder="******" 
            name="password" 
            className= "bg-zinc-800 text-white px-4 py-2 block mb-2" />
        <button className="bg-indigo-500 text-white px-4 py-2">
          Register
        </button>
      </form>
    
    </div>
  )
}

export default Registerpage