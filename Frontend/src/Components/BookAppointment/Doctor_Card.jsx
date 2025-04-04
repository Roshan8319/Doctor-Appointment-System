import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function Doctor_Card({ doctor }) {

  const [viewProfileButton, setviewProfileButton] = useState(false)



  return (
    <div
      className='py-2 w-full max-h-max flex gap-x-2 rounded-lg border border-[#F1B814] shadow-sm hover:shadow-xl duration-200'
      onMouseOver={(e) => { setviewProfileButton(true) }}
      onMouseLeave={(e) => { setviewProfileButton(false) }}
    >
      <div
        className='p-2 h-full max-w-max flex flex-col items-center justify-around'>
        <div className='w-40 h-40'>
          <img
            className='rounded-full overflow-hidden'
            src={doctor.profilePicture} alt="Doctor Profile Picture" />
        </div>

        <div className='h-6'>
          <Link
            className='text-base font-light text-[#BD1E51] hover:font-semibold duration-200'
          >
            {viewProfileButton ? 'View Profile>>' : ''}
          </Link>
        </div>
      </div>
      <div className='px-5 w-full'>
        <div className='flex flex-col gap-y-1'>
          <h1 className='text-2xl font-medium text-[#490B3D]'>Dr. {doctor.firstName} {doctor.lastName}</h1>
          <h1 className='text-base font-thin text-[#BD1E51]'>{doctor.specialization}</h1>
          <h1 className='text-base font-thin text-[#BD1E51]'>{doctor.experience} of Experience</h1>
          <h1 className='text-base font-thin text-[#BD1E51]'>{doctor.clinicAddress.fullAddress}</h1>
          <h1 className='text-base font-medium text-[#BD1E51]'>₹{doctor.appointmentFee} <span className='font-thin'>consultation fee</span></h1>
          <div className='flex items-center justify-start'>
            <div className={`${(doctor.ratings>=4.2)?'bg-green-500':'bg-orange-500' }    p-1 flex text-white gap-x-1 rounded-lg`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" /></svg>
              <p>{doctor.ratings}</p>
            </div>


          </div>
        </div>
        <div className='mt-5 flex items-center justify-end gap-x-2'>
        <button
            className='px-2 text-base font-medium text-white border border-[#BD1E51] py-1 rounded-lg bg-[#BD1E51] hover:bg-[#dd225d] duration-100'
          >
            Consult Online
          </button>
          <button
            className='px-2 text-base font-medium text-white border border-[#BD1E51] py-1 rounded-lg bg-[#BD1E51] hover:bg-[#dd225d] duration-100'
          >
            Book Clinic Visit
          </button>
        </div>

      </div>
    </div>
  )
}

export default Doctor_Card
