import React, { useEffect, useState, useRef } from 'react'
import Doctor_Header from './Doctor_Header'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import LoadingButton from '../Constants/LoadingButton';
import LoadingScreen from '../Constants/LoadingScreen'


function Doctor_Availability() {
  const location = useLocation();
  const doctorInfo = location.state
  const mountedRef = useRef(false)
  const [clinicDays, setClinicDays] = useState([-1, -2, -3, -4, -5, -6, -7])
  const [onlineDays, setOnlineDays] = useState([-1, -2, -3, -4, -5, -6, -7])
  const [clinicStartTime, setClinicStartTime] = useState('')
  const [clinicEndTime, setClinicEndTime] = useState('')
  const [onlineStartTime, setOnlineStartTime] = useState('')
  const [onlineEndTime, setOnlineEndTime] = useState('')
  const [savingData,setSavingData]=useState(false)
  const [loadingPage,setLoadingPage]=useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  function changeClinicSchedule(day) {
    setClinicDays((prevSchedule) => {
      const newSchedule = prevSchedule ? [...prevSchedule] : [];
      newSchedule[day] = newSchedule[day] * -1;
      return newSchedule;
    });
  }

  function changeOnlineSchedule(day) {
    setOnlineDays((prevSchedule) => {
      const newSchedule = prevSchedule ? [...prevSchedule] : [];
      newSchedule[day] = newSchedule[day] * -1;
      return newSchedule;
    });
  }


  async function updateAvailability() {
    setSavingData(true)
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('https://doctor-appointment-ashy.vercel.app/api/v1/doctor/mark-availability', { clinicDays, clinicStartTime, clinicEndTime, onlineDays, onlineStartTime, onlineEndTime },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      if(response.data.statusCode===200){
        setErrorMessage('')
        setSavingData(false)
      }
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setSavingData(false)
    }
  }


  async function getAvailability() {
    setLoadingPage(true)
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('https://doctor-appointment-ashy.vercel.app/api/v1/doctor/get-availability',
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        if (response.data.statusCode===200){
            const availability = response.data.data
            setClinicDays(availability?.clinicDays)
            setClinicStartTime(availability?.clinicStartTime)
            setClinicEndTime(availability?.clinicEndTime)
            setOnlineDays(availability?.onlineDays)
            setOnlineStartTime(availability?.clinicStartTime)
            setOnlineEndTime(availability?.onlineEndTime)
            setLoadingPage(false)
        }
      
      
    } catch (error) {
      console.log("in Error");
      
      console.log(error);

      // setErrorMessage(error.response.data.message)
    }
  }

    

  useEffect(() => {
    if (!mountedRef.current) {
      getAvailability()
      mountedRef.current = true
    }
  }, [])

  return (
    <div className='flex flex-col lg:flex-row '>
      <div>
        <Doctor_Header doctorInfo={doctorInfo} />
      </div>


      <div className='p-10 w-full '>

        <div className='text-2xl font-medium underline'>
          <h1>Availability</h1>
        </div>

        <div>
          <div className='mt-5 text-xl font-medium underline'>
            <h1>Clinic Availability</h1>
          </div>

          <div className='mt-5 flex flex-col lg:flex-row gap-x-16 gap-y-2'>
            <div className='flex flex-col'>

              <div>
                <label className='font-medium'> Clinic Timing</label>
              </div>
              <div className="mt-2 flex px-4 py-[16px] border border-[#F1B814] rounded-lg text-lg font-medium max-w-max">
                <div className="flex items-center space-x-2">
                  <h1 className="text-[#F1B814]">FROM</h1>
                  <input
                    value={clinicStartTime}
                    onChange={(e) => { setClinicStartTime(e.target.value) }}
                    className="outline-none px-2 border border-[#F1B814] rounded-md focus:ring-1 focus:ring-[#F1B814]"
                    type="time"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <h1 className="ml-1 text-[#F1B814]">TO</h1>
                  <input
                    value={clinicEndTime}
                    onChange={(e) => { setClinicEndTime(e.target.value) }}
                    className="outline-none border border-[#F1B814] rounded-md focus:ring-1 focus:ring-[#F1B814]"
                    type="time"
                  />
                </div>
              </div>
            </div>



            <div className='flex flex-col items-start justify-center'>
              <div className=''>
                <label className='font-medium'>Weekly clinicDays</label>
              </div>
              <div className='mt-2 p-2 grid grid-cols-3 gap-3 md:grid-cols-7 border border-[#F1B814] rounded-lg'>
                <button
                  className={`w-12 h-12 text-lg flex items-center justify-center font-semibold rounded-lg text-white ${clinicDays?.[0] > 0 ? 'bg-green-400 hover:bg-green-500 duration-150' : ' bg-red-400 hover:bg-red-500 duration-150'}`}
                  onClick={(e) => changeClinicSchedule(0)}
                >
                  MON
                </button>
                <button
                  className={`w-12 h-12 text-lg flex items-center justify-center font-semibold rounded-lg text-white ${clinicDays?.[1] > 0 ? 'bg-green-400 hover:bg-green-500 duration-150' : ' bg-red-400 hover:bg-red-500 duration-150'}`}
                  onClick={(e) => changeClinicSchedule(1)}
                >
                  TUE
                </button>
                <button className={`w-12 h-12 text-lg flex items-center justify-center font-semibold rounded-lg text-white ${clinicDays?.[2] > 0 ? 'bg-green-400 hover:bg-green-500 duration-150' : ' bg-red-400 hover:bg-red-500 duration-150'}`}
                  onClick={(e) => changeClinicSchedule(2)}
                >
                  WED
                </button>
                <button className={`w-12 h-12 text-lg flex items-center justify-center font-semibold rounded-lg text-white ${clinicDays?.[3] > 0 ? 'bg-green-400 hover:bg-green-500 duration-150' : ' bg-red-400 hover:bg-red-500 duration-150'}`}
                  onClick={(e) => changeClinicSchedule(3)}
                >
                  THUR
                </button>
                <button className={`w-12 h-12 text-lg flex items-center justify-center font-semibold rounded-lg text-white ${clinicDays?.[4] > 0 ? 'bg-green-400 hover:bg-green-500 duration-150' : ' bg-red-400 hover:bg-red-500 duration-150'}`}
                  onClick={(e) => changeClinicSchedule(4)}
                >
                  FRI
                </button>
                <button className={`w-12 h-12 text-lg flex items-center justify-center font-semibold rounded-lg text-white ${clinicDays?.[5] > 0 ? 'bg-green-400 hover:bg-green-500 duration-150' : ' bg-red-400 hover:bg-red-500 duration-150'}`}
                  onClick={(e) => changeClinicSchedule(5)}
                >
                  SAT
                </button>
                <div className='md:hidden'></div>
                <button className={`w-12 h-12 text-lg flex items-center justify-center font-semibold rounded-lg text-white ${clinicDays?.[6] > 0 ? 'bg-green-400 hover:bg-green-500 duration-150' : ' bg-red-400 hover:bg-red-500 duration-150'}`}
                  onClick={(e) => changeClinicSchedule(6)}
                >
                  SUN
                </button>
              </div>
            </div>

          </div>



        </div>


        <div className='mt-14'>
          <div className='mt-5 text-xl font-medium underline'>
            <h1>Online Availability</h1>
          </div>

          <div className='mt-5 flex flex-col lg:flex-row gap-x-16 gap-y-2'>


            <div>
              <div>
                <label className='font-medium'>Online Timing</label>
              </div>
              <div className="mt-2 flex px-4 py-[16px] border border-[#F1B814] rounded-lg text-lg font-medium max-w-max">
                <div className="flex items-center space-x-2">
                  <h1 className="text-[#F1B814]">FROM</h1>
                  <input
                    value={onlineStartTime}
                    onChange={(e) => { setOnlineStartTime(e.target.value) }}
                    className="outline-none px-2 border border-[#F1B814] rounded-md focus:ring-1 focus:ring-[#F1B814]"
                    type="time"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <h1 className="ml-1 text-[#F1B814]">TO</h1>
                  <input
                    value={onlineEndTime}
                    onChange={(e) => { setOnlineEndTime(e.target.value) }}
                    className="outline-none border border-[#F1B814] rounded-md focus:ring-1 focus:ring-[#F1B814]"
                    type="time"
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col items-start justify-center'>
              <div className=''>
                <label className='font-medium'>Weekly clinicDays</label>
              </div>
              <div className='mt-2 p-2 grid grid-cols-3 gap-3 md:grid-cols-7 border border-[#F1B814] rounded-lg'>
                <button
                  className={`w-12 h-12 text-lg flex items-center justify-center font-semibold rounded-lg text-white ${onlineDays?.[0] > 0 ? 'bg-green-400 hover:bg-green-500 duration-150' : ' bg-red-400 hover:bg-red-500 duration-150'}`}
                  onClick={(e) => changeOnlineSchedule(0)}
                >
                  MON
                </button>
                <button
                  className={`w-12 h-12 text-lg flex items-center justify-center font-semibold rounded-lg text-white ${onlineDays?.[1] > 0 ? 'bg-green-400 hover:bg-green-500 duration-150' : ' bg-red-400 hover:bg-red-500 duration-150'}`}
                  onClick={(e) => changeOnlineSchedule(1)}
                >
                  TUE
                </button>
                <button className={`w-12 h-12 text-lg flex items-center justify-center font-semibold rounded-lg text-white ${onlineDays?.[2] > 0 ? 'bg-green-400 hover:bg-green-500 duration-150' : ' bg-red-400 hover:bg-red-500 duration-150'}`}
                  onClick={(e) => changeOnlineSchedule(2)}
                >
                  WED
                </button>
                <button className={`w-12 h-12 text-lg flex items-center justify-center font-semibold rounded-lg text-white ${onlineDays?.[3] > 0 ? 'bg-green-400 hover:bg-green-500 duration-150' : ' bg-red-400 hover:bg-red-500 duration-150'}`}
                  onClick={(e) => changeOnlineSchedule(3)}
                >
                  THUR
                </button>
                <button className={`w-12 h-12 text-lg flex items-center justify-center font-semibold rounded-lg text-white ${onlineDays?.[4] > 0 ? 'bg-green-400 hover:bg-green-500 duration-150' : ' bg-red-400 hover:bg-red-500 duration-150'}`}
                  onClick={(e) => changeOnlineSchedule(4)}
                >
                  FRI
                </button>
                <button className={`w-12 h-12 text-lg flex items-center justify-center font-semibold rounded-lg text-white ${onlineDays?.[5] > 0 ? 'bg-green-400 hover:bg-green-500 duration-150' : ' bg-red-400 hover:bg-red-500 duration-150'}`}
                  onClick={(e) => changeOnlineSchedule(5)}
                >
                  SAT
                </button>
                <div className='md:hidden'></div>
                <button className={`w-12 h-12 text-lg flex items-center justify-center font-semibold rounded-lg text-white ${onlineDays?.[6] > 0 ? 'bg-green-400 hover:bg-green-500 duration-150' : ' bg-red-400 hover:bg-red-500 duration-150'}`}
                  onClick={(e) => changeOnlineSchedule(6)}
                >
                  SUN
                </button>
              </div>
            </div>

          </div>





        </div>

        <div className='mt-16'>


          {savingData?(
            <div className='px-6 py-1 bg-[#BD1E51] max-w-max rounded-lg'>
              <LoadingButton/>
            </div>
          ):(
            <button
            onClick={updateAvailability}
            className='px-2 py-1 rounded-lg text-white font-medium bg-[#BD1E51] hover:bg-[#dd225d] duration-100'
          >Save Changes</button>
          )}

            
          
        </div>


      </div>

      {
        loadingPage &&(
            <LoadingScreen/>
        )
      }
    </div>
  )
}

export default Doctor_Availability

