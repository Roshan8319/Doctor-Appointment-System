import React, { useState } from 'react'
import Doctor_Header from './Doctor_Header'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios';
import LoadingButton from '../Constants/LoadingButton'






function Doctor_Setting() {
  const location = useLocation();
  let doctorInfo = location.state
  const [showGoLive,setShowGoLive]=useState(doctorInfo.liveOnWebsite)
  const [loading, setloading] = useState(false)



  return (
    <div className='flex flex-col lg:flex-row'>
      <div>
        <Doctor_Header doctorInfo={doctorInfo} />
      </div>
      <div className='flex w-full'>
        <div className="pl-5 w-full flex flex-col">
          <div className="h-24 border bg-gradient-to-r from-gray-300 to-yellow-700"></div>

          <div className='flex  items-center justify-start gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#490B3D"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" /></svg>
            <h1 className="text-xl md:text-2xl font-medium text-[#490B3D]">Settings</h1>
          </div>

          <div className="mt-4 flex flex-col lg:flex-row items-center justify-center">
            <hr className="border w-full mr-10 border-[#F1B814]" />
          </div>

          <div className='mt-10 flex items-center justify-center'>
            <div className=' grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-10'>

              <div className='flex items-center justify-center'>
                <div className='p-2 rounded-lg border border-[#F1B814] w-[50%]'>
                  <div className='flex items-center justify-between'>
                    <h1 className='text-lg font-medium underline'>Update Profile</h1>
                    <Link
                    to='/doctor/update-profile'
                    state={doctorInfo}
                     className='px-2 rounded-lg bg-[#BD1E51] text-white font-medium hover:bg-[#e0386e] duration-100'
                     >
                      Update Now
                      </Link>
                  </div>
                  <div className=' text-center mt-3'>
                    <h1 className='font-medium text-gray-500'>Keep your profile information current to ensure a seamless experience on our platform.</h1>
                  </div>
                </div>
              </div>


              <div className='flex items-center justify-center'>
                  
              <div className='p-2 rounded-lg border border-[#F1B814] w-[50%]'>
                <div className='flex items-center justify-between'>
                  <h1 className='text-lg font-medium underline'>Schedule</h1>
                  <Link 
                   to="/doctor/availability"
                   state={doctorInfo}
                  className='px-2 rounded-lg bg-[#BD1E51] text-white font-medium hover:bg-[#e0386e] duration-100'
                  >
                    Update Now
                  </Link>
                </div>
                <div className=' text-center mt-3'>
                  <h1 className='font-medium text-gray-500'>Maintain an accurate working schedule to ensure effective time management and coordination.</h1>
                </div>
              </div>
              </div>


              <div className='flex items-center justify-center'>

              <div className='p-2 rounded-lg border border-[#F1B814] w-[50%]'>
                <div className='flex items-center justify-between'>
                  <h1 className='text-lg font-medium underline'>Plan Leave</h1>
                  <button className='px-2 rounded-lg bg-[#BD1E51] text-white font-medium hover:bg-[#e0386e] duration-100'>Mark your leave</button>
                </div>
                <div className=' text-center mt-3'>
                  <h1 className='font-medium text-gray-500'>Plan ahead and mark your leave dates to prevent any appointments from being scheduled during your absence.</h1>
                </div>
              </div>
              </div>

            




            </div>
          </div>

          <div className="mt-4 flex flex-col lg:flex-row items-center justify-center">
            <hr className="border w-full mr-10 border-[#F1B814]" />
          </div>



        </div>
      </div>
    </div>

  )
}

export default Doctor_Setting
