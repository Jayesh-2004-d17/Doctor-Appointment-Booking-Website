import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'


const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])



  return (
    <div className='w-full max-w-6xl m-5 p-4'>
      <p className='mb-4 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        {/* Header */}
        <div className='hidden sm:grid sm:grid-cols-[0.5fr_2fr_2fr_2fr_1fr_1fr] py-4 px-6 border-b font-medium text-gray-700'>
          <p>#</p>
          <p>Patient</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p className='text-center'>Actions</p>
        </div>

        {/* Data */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className='flex flex-wrap justify-between max-sm:gap-3 sm:grid sm:grid-cols-[0.5fr_2fr_2fr_2fr_1fr_1fr] items-center text-gray-500 py-4 px-6 border-b hover:bg-gray-50'
          >
            {/* Index */}
            <p className='max-sm:hidden'>{index + 1}</p>

            {/* Patient */}
            <div className='flex items-center gap-3'>
              <img className='w-9 h-9 rounded-full object-cover' src={item.userData.image} alt='' />
              <p>{item.userData.name}</p>
            </div>

            {/* Date & Time */}
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            {/* Doctor */}
            <div className='flex items-center gap-3'>
              <img className='w-9 h-9 rounded-full bg-gray-200 object-cover' src={item.docData.image} alt='' />
              <p>{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p>{currency}{item.amount}</p>


            <div className='flex justify-center items-center'>
              {
                item.cancelled
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  :
                  item.isCompleted
                  ?
                  <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-9 cursor-pointer'
                    src={assets.cancel_icon}
                    alt=''
                  />
              }
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default AllAppointments
