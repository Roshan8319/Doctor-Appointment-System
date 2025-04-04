import React from 'react'
import Doctor_Header from './Doctor_Header'
import { useLocation } from 'react-router-dom'

function Doctor_Appointments() {

  const location = useLocation();
  const doctorInfo=location.state
  return (
    <div className='flex'>
      <div>
        <Doctor_Header  doctorInfo={doctorInfo} />
      </div>

      <div>
        <h1 className='text-black'>This is Doctor's Appointment History</h1>
      </div>
    </div>
  )
}

export default Doctor_Appointments
