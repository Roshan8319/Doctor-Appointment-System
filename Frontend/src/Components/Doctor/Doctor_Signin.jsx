import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Doctor_Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

    async function signin() {
        if (!email || !password) {
            alert('Both the fields are required.')
            return;
        }
        setloading(true)
        try {
            const response = await axios.post('https://doctor-appointment-ashy.vercel.app/api/v1/doctor/login', { email, password })

            if (response?.data?.statusCode === 200) {
                const doctorInfo = response.data.data.doctor
                localStorage.setItem('accessToken', response.data.data.accessToken)
                localStorage.setItem('refreshToken', response.data.data.refreshToken)
                navigate('/doctor/home', { state: doctorInfo })
                setloading(false)
            }

        } catch (error) {
            setErrorMessage(error.response.data.message)
            setloading(false)

        }
    }


    return (
        <div className='flex flex-col items-center justify-center'>
            <header
                className='z-[1] w-full h-10 flex items-center justify-center gap-x-10 text-xl font-semibold shadow-2xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600'
            >
                <NavLink
                    to='/user/login'
                    className={({ isActive }) =>
                        `${isActive ? "bg-white text-yellow-600 shadow-md" : "text-white"} px-4 py-2 h-[80%] hover:bg-yellow-700 hover:text-white duration-500 transform hover:scale-105 transition-all flex items-center justify-center rounded-lg`
                    }
                >
                    User
                </NavLink>
                <NavLink
                    to='/doctor/login'
                    className={({ isActive }) =>
                        `${isActive ? "bg-white text-yellow-600 shadow-md" : "text-white"} px-4 py-2 h-[80%] hover:bg-yellow-700 hover:text-white duration-500 transform hover:scale-105 transition-all flex items-center justify-center rounded-lg`
                    }
                >
                    Doctor
                </NavLink>
            </header>


            <div className='mt-20 w-9/12 shadow-2xl rounded-2xl'>
                <div className=' flex justify-center'>



                    <div
                        className='z-[1] py-5 lg:w-1/2 flex flex-col gap-4 '>

                        <div className='text-center'>
                            <h1 className='text-2xl font-medium text-[#490B3D]'>WELCOME DOCTOR</h1>
                            <h1>LOGO</h1>
                            <p className='text-base font-normal'>Log in to get the moment updates on your new appointments.</p>
                        </div>
                        <div>
                            <ul className='flex flex-col items-center justify-center w-[90%] gap-3'>
                                <li className='p-2 w-2/3 relative flex  border-[1px] rounded-full  border-gray-300 focus-within:border-[#F1BB14] focus-within:border-b-2 hover:border-[#F1BB14]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                                    <input
                                        className='outline-0 ml-3 w-full'
                                        placeholder='Email'
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        type="text" />
                                </li>
                                <li className='p-2 w-2/3 relative flex  border-[1px] rounded-full border-gray-300 focus-within:border-[#F1BB14] focus-within:border-b-2 hover:border-[#F1BB14]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M80-200v-80h800v80H80Zm46-242-52-30 34-60H40v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Z" /></svg>
                                    <input
                                        className='outline-0 ml-3 w-full'
                                        placeholder='Password'
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        type="password" />
                                </li>
                                <h1 className='text-red-500'>{errorMessage}</h1>   {/* Error message from any API request. */}
                                <button
                                    onClick={signin}
                                    className='px-2 h-7 rounded-full w-2/3 text-lg font-medium text-white bg-[#BD1E51] hover:bg-[#841538] duration-100'>
                                    {!loading ? `Signin` : `loading.....`}
                                </button>
                                <p className='text-[#490B3D]'>Don't have a account? <Link to='/doctor/register' className='font-bold'>SignUp Now </Link></p>
                            </ul>
                        </div>
                        <div className=''>
                            <ul>
                                <li className='flex items-center justify-center'>
                                    <hr className="w-1/4 border-[2px] border-[#F1B814] rounded-full" />
                                    <p className='mx-2 text-[#490B3D] font-medium'>OR SIGNIN WITH</p>
                                    <hr className="w-1/4 border-[2px] border-[#F1B814] rounded-full" />
                                </li>
                            </ul>
                        </div>
                        <div className='flex items-center justify-center gap-x-4'>
                            <div
                                className='w-8 h-8 bg-[#BD1E51] rounded-full'
                            ></div>
                            <div
                                className='w-8 h-8 bg-[#BD1E51] rounded-full'
                            ></div>
                            <div
                                className='w-8 h-8 bg-[#BD1E51] rounded-full'
                            ></div>
                        </div>


                    </div>
                    <div className='hidden lg:block w-1/2 rounded-r-2xl overflow-hidden lg:flex lg:items-center lg:justify-center'
                        style={{
                            backgroundImage: `url(https://img.freepik.com/free-photo/elevated-view-stethoscope-medical-equipments-dual-background_23-2147874903.jpg?t=st=1722599468~exp=1722603068~hmac=9cd51c01c2a81c74b7ad772ffaa18a84d077cd5b0ae6f71830a3646efadc76cc&w=740)`
                        }}
                    >
                        <div className='mb-0'>
                            <Link
                                to='/doctor/register'
                                className='px-5 py-1 mb-0 text-lg font-medium rounded-lg border border-orange-800 bg-transparent text-orange-800 hover:border-[#490B3D] hover:text-[#490B3D] duration-300'>
                                SignUp
                            </Link>
                        </div>
                    </div>


                    <div className='hidden lg:block z-[-1] w-96 h-96 bg-gradient-to-r from-yellow-500 to-red-800 right-40 absolute left rotate-45'>

                    </div>
                </div>
            </div>


            {/* Divs Pop */}

        </div>
    )
}

export default Doctor_Signin
