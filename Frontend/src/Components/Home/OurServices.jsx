import React from 'react'
import { NavLink } from 'react-router-dom'

function OurServices() {
  return (
    <div>
       <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Services</h2>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className="bg-white text-[#490B3D] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-110 duration-500 hover:bg-gradient-to-b from-white via-orange-100 to-yellow-100 grid-item "
            >
              <div>
                <img
                  className='rounded-lg'
                  src="https://img.freepik.com/free-photo/high-angle-pill-foils-plastic-containers_23-2148533456.jpg?t=st=1723277675~exp=1723281275~hmac=7c3af75c0368ce81eb41594807b12300b96cb38f07ae61e2a0e34ada0ddb0eca&w=996"
                  alt="Buy Medicine"
                />
              </div>
              <div className='mt-4 flex flex-col items-center justify-center gap-y-2'>
                <NavLink
                  className='max-w-max text-xl font-medium px-4 rounded-xl hover:bg-gray-50 hover:text-[#BD1E51]'
                >
                  Buy Medicine
                </NavLink>
                <p>Get medicine delivered at your doorstep.</p>
              </div>
            </div>

            <div
              className="bg-white text-[#490B3D] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-110 duration-500 hover:bg-gradient-to-b from-white via-orange-100 to-yellow-100 grid-item "
            >
              <div>
                <img
                  className='rounded-lg'
                  src="https://img.freepik.com/free-photo/surgeon-holding-blood-test_53876-94763.jpg?t=st=1723279447~exp=1723283047~hmac=69b00c170d2fb6f4a34f6b6e7379f70e94e2b2ee166418387b0e86553377dc52&w=996"
                  alt="Lab Test"
                />
              </div>
              <div className='mt-4 flex flex-col items-center justify-center gap-y-2'>
                <NavLink
                  className='max-w-max text-xl font-medium px-4 rounded-xl hover:bg-gray-50 hover:text-[#BD1E51]'
                >
                  Lab Test
                </NavLink>
                <p>Book lab tests and get reports online.</p>
              </div>
            </div>

            <div
              className="bg-white text-[#490B3D] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-110 duration-500 hover:bg-gradient-to-b from-white via-orange-100 to-yellow-100 grid-item "
            >
              <div>
                <img
                  className='rounded-lg'
                  src="https://img.freepik.com/free-photo/senior-doctor-listening-patient-closely_23-2147896781.jpg?t=st=1723279650~exp=1723283250~hmac=32c0ccb3f376ef1c862b0a4f76dececa9a5568bd9dbb00e05d4121f5662bc2e7&w=996"
                  alt="Book Appointment"
                />
              </div>
              <div className='mt-4 flex flex-col items-center justify-center gap-y-2'>
                <NavLink
                  className='max-w-max text-xl font-medium px-4 rounded-xl hover:bg-gray-50 hover:text-[#BD1E51]'
                >
                  Book Appointment
                </NavLink>
                <p>Schedule appointments with top doctors in your area.</p>
              </div>
            </div>

            <div
              className="bg-white text-[#490B3D] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-110 duration-500 hover:bg-gradient-to-b from-white via-orange-100 to-yellow-100 grid-item "
            >
              <div>
                <img
                  className='rounded-lg'
                  src="https://img.freepik.com/free-photo/medical-teleconsultation-sick-patient-home_23-2149329018.jpg?t=st=1723279767~exp=1723283367~hmac=844487e91a519f2f9a3c1c444628433a4fed588180f9c99f46af1d3a78d19809&w=996"
                  alt="Consult Online"
                />
              </div>
              <div className='mt-4 flex flex-col items-center justify-center gap-y-2'>
                <NavLink
                  className='max-w-max text-xl font-medium px-4 rounded-xl hover:bg-gray-50 hover:text-[#BD1E51]'
                >
                  Consult Doctor
                </NavLink>
                <p>Get online consultations with expert doctors.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default OurServices
