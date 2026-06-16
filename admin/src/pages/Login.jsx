import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {

  const navigate = useNavigate()

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

   const { backendUrl, setAToken } = useContext(AdminContext)
   const { setDToken } = useContext(DoctorContext)
  

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      // ================= ADMIN LOGIN =================
      if (state === 'Admin') {

        const { data } = await axios.post(
          backendUrl + '/api/admin/login',
          { email, password }
        )

        console.log("Admin Response:", data)

        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)

          toast.success("Admin Login Successful ✅")

          navigate('/admin-dashboard')

        } else {
          toast.error(data.message)
        }
      }

      // ================= DOCTOR LOGIN =================
      else {

        const { data } = await axios.post(
          backendUrl + '/api/doctor/login',
          { email, password }
        )

        console.log("Doctor Response:", data)

        if (data.success) {
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)

          console.log("Doctor Token:", data.token)

          toast.success("Doctor Login Successful ✅")

          navigate('/doctor-dashboard')
          
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>

      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>

        {/* Title */}
        <p className='text-2xl font-semibold m-auto'>
          <span className='text-primary'>{state}</span>
          <span> Login</span>
        </p>

        {/* Email */}
        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='email'
            required
          />
        </div>

        {/* Password */}
        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='password'
            required
          />
        </div>

        {/* Button */}
        <button className='bg-primary text-white w-full py-2 rounded-md text-base mt-5 hover:opacity-90 transition-all'>
          Login
        </button>

        {/* Toggle */}
        {
          state === 'Admin'
            ? (
              <p>
                Doctor Login?
                <span
                  className='text-primary cursor-pointer hover:underline ml-1'
                  onClick={() => setState('Doctor')}
                >
                  Click here
                </span>
              </p>
            )
            : (
              <p>
                Admin Login?
                <span
                  className='text-primary cursor-pointer hover:underline ml-1'
                  onClick={() => setState('Admin')}
                >
                  Click here
                </span>
              </p>
            )
        }

      </div>
    </form>
  )
}

export default AdminLogin