import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
         {/* Left Side */}
         <div>
            <img className='mb-5 w-40 cursor-pointer' src={assets.logo} alt=''/>
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Bringing healthcare closer to you. Discover qualified doctors, book appointments in seconds, and experience seamless medical care all in one place.</p>
         </div>

         {/* center Side */}
         <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600 cursor-pointer'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
         </div>

         {/* right Side */}
         <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600 cursor-pointer'>
                <li>+91 5465765349</li>
                <li>prescripto1234@gmail.com</li>
            </ul>
         </div>
       </div>

       {/*Comment */}
       <div>
         <hr/>
         <p className='py-5 text-sm text-center'>Copyright 2024 @ JayeshDharmik - All Right Reserved.</p>
       </div>
    </div>
  )
}

export default Footer
