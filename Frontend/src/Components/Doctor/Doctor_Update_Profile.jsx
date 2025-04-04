import React, { useState, useEffect } from 'react'
import Doctor_Header from './Doctor_Header'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function Doctor_Update_Profile() {

  const location = useLocation();
  const doctorInfo = location.state
  let count = 0
  const [lastName, setLastName] = useState(doctorInfo.lastName)
  const [specialization, setSpecialization] = useState(doctorInfo.specialization)
  const [experience, setExperience] = useState(doctorInfo.experience)
  const [degree, setDegree] = useState(doctorInfo.setDegree)
  const [appointmentFee, setAppointmentFee] = useState(doctorInfo.appointmentFee)
  const [street, setStreet] = useState(doctorInfo.clinicAddress.street)
  const [city, setCity] = useState(doctorInfo.clinicAddress.city)
  const [state, setState] = useState(doctorInfo.clinicAddress.state)
  const [fullAddress, setFullAddress] = useState(doctorInfo.clinicAddress.fullAddress)
  const [clinicPhone, setClinicPhone] = useState(doctorInfo.clinicAddress.clinicPhone)
  const [pincode, setPincode] = useState(doctorInfo.clinicAddress.pincode)
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')
  const [change, setChange] = useState(false)



  async function updateProfile() {

    console.log(change);


    if (!change) {
      setErrorMessage('No changes detected.')
      setMessage('')
      return
    }
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.patch('https://doctor-appointment-ashy.vercel.app/api/v1/doctor/update-profile', { specialization, experience, degree, street, city, fullAddress, state, pincode, clinicPhone, appointmentFee },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      const str = response.data.message + " Changes will be reflected soon......"
      setMessage(str)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }




  }

  return (
    <div className='flex flex-col lg:flex-row'>
      <div>
        <Doctor_Header doctorInfo={doctorInfo} />
      </div>
      <div className=' w-full px-16 py-5 flex flex-col gap-2 '>
        <div>
          <h1 className='text-2xl font-medium underline text-[#490B3D]'>Personal Details</h1>
        </div>

        <div className='mt-5 px-26 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-y-3 gap-x-20'>
          <div className='flex flex-col items-start'>
            <label className='text-base font font-medium text-[#490B3D]'>Firstname</label>
            <input
              className='mt-[1px] py-1 px-4 w-full rounded-md text-[#F1B814] border text-lg font-medium outline-0 border-[#F1BB14] focus-within:border-[#F1BB14] focus-within:border-b-2 hover:cursor-not-allowed'
              type={doctorInfo.firstName}
              disabled
              value="Sumit"
            />
          </div>
          <div className='flex flex-col items-start'>
            <label className='text-base font font-medium text-[#490B3D]'>Lastname</label>
            <input
              className='mt-[1px] py-1 px-4 w-full rounded-md text-[#F1B814] border text-lg font-medium outline-0 border-[#F1BB14] focus-within:border-[#F1BB14] focus-within:border-b-2'
              type="text"
              value={lastName}
              onChange={(e) => (
                setLastName(e.target.value), setChange(true))}
            />
          </div>
          <div className='flex flex-col items-start'>
            <label className='text-base font font-medium text-[#490B3D]'>Email</label>
            <input
              className='mt-[1px] py-1 px-4 w-full rounded-md text-[#F1B814] border text-lg font-medium outline-0 border-[#F1BB14] focus-within:border-[#F1BB14] focus-within:border-b-2 hover:cursor-not-allowed'
              type="text"
              disabled
              value={doctorInfo.email}
            />
          </div>
          <div className='flex flex-col items-start'>
            <label className='text-base font font-medium text-[#490B3D]'>Phone</label>
            <input
              className='mt-[1px] py-1 px-4 w-full rounded-md text-[#F1B814] border text-lg font-medium outline-0 border-[#F1BB14] focus-within:border-[#F1BB14] focus-within:border-b-2 hover:cursor-not-allowed'
              type="Number"
              disabled
              value={doctorInfo.phone}
            />
          </div>
          <div className='flex flex-col items-start'>
            <label className='text-base font font-medium text-[#490B3D]'>Specialization</label>
            <select
              name="Specialization"
              value={specialization}
              onChange={(e) => { setSpecialization(e.target.value), setChange(true) }}
              className='mt-[1px] py-1 px-4 w-full rounded-md text-[#F1B814] border text-lg font-medium outline-0 border-[#F1BB14] focus-within:border-[#F1BB14] focus-within:border-b-2'
            >
              <option value="None">{doctorInfo.specialization}</option>
              <option value="0-1 year">Others</option>
              <option value="General Physician">General Physician</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
              <option value="Orthopedist">Orthopedist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Psychiatrist">Psychiatrist</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Urologist">Urologist</option>
              <option value="7 Years Above">Nephrologist</option>
              <option value="7 Years Above">Endocrinologist</option>
              <option value="7 Years Above">Hematologist</option>
            </select>
          </div> 
          <div className='flex flex-col items-start '>
            <label className='text-base font font-medium text-[#490B3D]'>Experience</label>
            <select
              value={experience}
              onChange={(e) => { setExperience(e.target.value), setChange(true) }}
              name="Experience"
              className='mt-[1px] py-1 px-4 w-full rounded-md text-[#F1B814] border text-lg font-medium outline-0 border-[#F1BB14] focus-within:border-[#F1BB14] focus-within:border-b-2'
            >
              <option value="None">{doctorInfo.experience}</option>
              <option className='hover:bg-red-300' value="0-1 year">Below 1 Year</option>
              <option value="1-3 year">1-3 Years</option>
              <option value="3-6 year">3-6 Years</option>
              <option value="6 Years Above">6 Years Above</option>
            </select>
          </div>
          <div className='flex flex-col items-start'>
            <label className='text-base font font-medium text-[#490B3D]'>Degree</label>
            <select
              value={degree}
              onChange={(e) => { setDegree(e.target.value), setChange(true) }}
              name="Degree"
              className='mt-[1px] py-1 px-4 w-full rounded-md text-[#F1B814] border text-lg font-medium outline-0 border-[#F1BB14] focus-within:border-[#F1BB14] focus-within:border-b-2'
            >
              <option value="None">{doctorInfo.degree}</option>
              <option value="Doctor of Medicine (MD)">Doctor of Medicine (MD)</option>
              <option value="Bachelor of Medicine, Bachelor of Surgery (MBBS/MBChB)">Bachelor of Surgery (MBBS/MBChB)</option>
              <option value="Doctor of Pharmacy (PharmD)">Doctor of Pharmacy (PharmD)</option>
              <option value="Doctor of Physical Therapy (DPT)">Doctor of Physical Therapy (DPT)</option>
              <option value="Doctor of Dental Medicine (DMD)">Doctor of Dental Medicine (DMD)</option>
              <option value="Master of Surgery (MS)">Master of Surgery (MS)</option>
              <option value="Doctor of Medicine in Gastroenterology (DM Gastroenterology)">Doctor of Medicine in Gastroenterology (DM Gastroenterology)</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className='flex flex-col items-start'>
            <label className='text-base font font-medium text-[#490B3D]'>Appointment Fee</label>
            <input
              className='mt-[1px] py-1 px-4 w-full rounded-md text-[#F1B814] border text-lg font-medium outline-0 border-[#F1BB14] focus-within:border-[#F1BB14] focus-within:border-b-2'
              type='Number'
              value={appointmentFee}
              onChange={(e) => { setAppointmentFee(e.target.value), setChange(true) }}
            />
          </div>



        </div>

        <div className="mt-4 flex flex-col lg:flex-row items-center justify-center">
          <hr className="border w-11/12 border-[#F1B814]" />
        </div>

        <div className=''>
          <h1 className='text-2xl font-medium underline text-[#490B3D]'>Clinic Address</h1>
        </div>

        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-x-20'>
          <div className='flex flex-col items-start'>
            <label className='text-base font-medium text-[#490B3D]'>Street</label>
            <input
              className='mt-[1px] py-1 px-4 w-full rounded-md text-[#F1B814] border text-lg font-medium outline-0 border-[#F1BB14] focus-within:border-[#F1BB14] focus-within:border-b-2'
              type="text"
              onChange={(e) => (setStreet(e.target.value), setChange(true))}
              value={doctorInfo.clinicAddress.street}
            />
          </div>

          <div className='flex flex-col items-start'>
            <label className='text-base font-medium text-[#490B3D]'>City</label>
            <input
              className='mt-[1px] py-1 px-4 w-full rounded-md text-[#F1B814] border text-lg font-medium outline-0 border-[#F1BB14] focus-within:border-[#F1BB14] focus-within:border-b-2'
              type="text"
              value={city}
              onChange={(e) => (setCity(e.target.value), setChange(true))}
            />
          </div>

          <div className='flex flex-col items-start'>
            <label className='text-base font-medium text-[#490B3D]'>Clinic Contact Number</label>
            <input
              className='mt-[1px] py-1 px-4 w-full rounded-md text-[#F1B814] border text-lg font-medium outline-0 border-[#F1BB14] focus-within:border-[#F1BB14] focus-within:border-b-2'
              type="number"
              value={clinicPhone}
              onChange={(e) => { setClinicPhone(e.target.value), setChange(true) }}
            />
          </div>

          <div className='flex flex-col items-start'>
            <label className='text-base font-medium text-[#490B3D]'>Pincode</label>
            <input
              className='mt-[1px] py-1 px-4 w-full rounded-md text-[#F1B814] border text-lg font-medium outline-0 border-[#F1BB14] focus-within:border-[#F1BB14] focus-within:border-b-2'
              type="number"
              value={pincode}
              onChange={(e) => { setPincode(e.target.value), setChange(true) }}
            />
          </div>

          <div className='flex flex-col items-start'>
            <label className='text-base font-medium text-[#490B3D]'>Full Address</label>
            <input
              className='mt-[1px] py-1 px-4 w-full rounded-md text-[#F1B814] border text-lg font-medium outline-0 border-[#F1BB14] focus-within:border-[#F1BB14] focus-within:border-b-2'
              type="text"
              value={fullAddress}
              onChange={(e) => (setFullAddress(e.target.value), setChange(true))}
            />
          </div>

          <div className='flex flex-col items-start'>
            <label className='text-base font-medium text-[#490B3D]'>State</label>
            <select
              value={state}
              onChange={(e) => { setState(e.target.value), setChange(true) }}
              name="Degree"
              className='mt-[1px] py-1 px-4 w-full rounded-md text-[#F1B814] border text-lg font-medium outline-0 border-[#F1BB14] focus-within:border-[#F1BB14] focus-within:border-b-2'
            >
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Delhi">Delhi</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            </select>
          </div>
        </div>




        <h1 className='text-red-500'>{errorMessage}</h1>
        <h1 className='text-green-600 text-lg font-medium' >{message}</h1>

        <div>
          <button
            onClick={updateProfile}
            className='bg-[#BD1E51] px-4 py-2 text-lg font-medium text-white rounded-lg hover:bg-[#e0386e] duration-100'
          >Save Changes</button>
        </div>


      </div>
    </div>



  )
}

export default Doctor_Update_Profile
