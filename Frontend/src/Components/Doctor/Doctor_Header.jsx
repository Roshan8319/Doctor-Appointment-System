import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import cheerio from 'cheerio'

function Doctor_Header(props) {

    const doctorInfo=props.doctorInfo;
    const location = useLocation();
    const [showLogoutMenu, setShowLogoutMenu] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()

    const logout = async () => {
        console.log("Clicked Logout button");
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post('https://doctor-appointment-ashy.vercel.app/api/v1/doctor/logout', {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            localStorage.clear();
            navigate('/doctor/login')
        } catch (error) {
            console.log(error);

        }
    }


    return (

        <div>

            {/* Vertical Navigation bar for lg screen */}
            <div className='p-1 ml-2 w-[60px] h-screen shadow-2xl hidden lg:block'>
                <div className='flex flex-col items-center justify-center h-[90%]'>
                    <ul className='flex flex-col gap-y-4'>
                        <li className={`${location.pathname === '/doctor/home' ? 'bg-[#BD1E51] rounded-lg' : 'bg-white  rounded-lg '} p-1`}>
                            <Link
                                className=''
                                to='/doctor/home'
                                state={doctorInfo}
                            >
                                <svg
                                    className={`${location.pathname === '/doctor/home' ? 'fill-white' : 'fill-[#490B3D]'}`}
                                    xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" ><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                                </svg>
                            </Link>
                        </li>
                        <li className={`${location.pathname === '/doctor/appointments' ? 'bg-[#BD1E51] rounded-lg shadow-2xl' : 'bg-white'} p-1`}>
                            <Link
                                className=''
                                to='/doctor/appointments'
                                state={doctorInfo}
                            >
                                <svg
                                    className={`${location.pathname === '/doctor/appointments' ? 'fill-white' : 'fill-[#490B3D]'}`}
                                    xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px"><path d="M360-300q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" /></svg>
                            </Link>
                        </li>
                        <li className={`${location.pathname === '/doctor/mark-leave' ? 'bg-[#BD1E51] rounded-lg shadow-2xl' : 'bg-white'} p-1`}>
                            <Link
                                className=''
                                to="/doctor/mark-leave"
                                state={doctorInfo}
                                >
                                <svg
                                    className={`${location.pathname === '/doctor/mark-leave' ? 'fill-white' : 'fill-[#490B3D]'}`}
                                    xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#490B3D"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" /></svg>
                            </Link>
                        </li>
                        <li 
                        className={`${location.pathname === '/doctor/setting' ? 'bg-[#BD1E51] rounded-lg shadow-2xl' : 'bg-white'} p-1`}>
                        <Link 
                        to='/doctor/setting'
                        state={doctorInfo}
                        >
                                <svg
                                    className={`${location.pathname === '/doctor/setting' ? 'fill-white' : 'fill-[#490B3D]'}`}
                                    xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#490B3D"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" /></svg>
                            </Link>
                        </li>
                        

                    </ul>
                </div>
                <div className='flex items-center justify-center'>
                    <ul>
                        <li
                            className='rounded-lg w-10 h-10 border border-[#F1B814] overflow-hidden'
                            onMouseOver={() => setShowLogoutMenu(true)}
                            onMouseOut={() => setShowLogoutMenu(false)}
                        >
                            <img className='w-full h-full' src={doctorInfo.profilePicture}/>
                        </li>
                    </ul>
                </div>
                {/* Logout popop */}
                {
                    showLogoutMenu && (
                        <div
                            onMouseOver={() => setShowLogoutMenu(true)}
                            onMouseOut={() => setShowLogoutMenu(false)}
                            className='fixed left-[60px] bottom-5 w-[210px] border flex flex-col justify-center gap-1 rounded-lg bg-white shadow-xl px-1 py-3'>
                            <div className='flex items-center justify-center'>
                                <div>
                                    <section className='rounded-full w-10 h-10 border overflow-hidden'>
                                        <img className='w-full h-full' src={doctorInfo.profilePicture} />
                                    </section>
                                </div>
                                <div className='ml-2'>
                                    <p className='text-base font-medium'>{doctorInfo.firstName}&nbsp;{doctorInfo.lastName}</p>
                                    <p className='text-gray-500 -mt-1' >{doctorInfo.email}</p>
                                </div>
                            </div>
                            <div className='w-full'>
                                <hr className="border-[1px] border-gray-200" />
                            </div>
                            <div>
                                <ul className='flex flex-col items-start gap-1 px-[1px]'>
                                    <li className='px-4 py-[1px] flex w-full rounded-lg hover:bg-gray-200 duration-100'>
                                        <Link
                                            className='flex items-center justify-center'
                                            to='/doctor/home'
                                            state={doctorInfo}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#490B3D"><path d="M480-480q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM192-192v-96q0-23 12.5-43.5T239-366q55-32 116.29-49 61.29-17 124.5-17t124.71 17Q666-398 721-366q22 13 34.5 34t12.5 44v96H192Zm72-72h432v-24q0-5.18-3.03-9.41-3.02-4.24-7.97-6.59-46-28-98-42t-107-14q-55 0-107 14t-98 42q-5 4-8 7.72-3 3.73-3 8.28v24Zm216.21-288Q510-552 531-573.21t21-51Q552-654 530.79-675t-51-21Q450-696 429-674.79t-21 51Q408-594 429.21-573t51 21Zm-.21-72Zm0 360Z" /></svg>
                                            <p className='ml-1 text-base font-medium text-[#490B3D]'>View Profile</p>
                                        </Link>
                                    </li>
                                    <li className='px-4 py-[1px] flex w-full rounded-lg hover:bg-gray-200 duration-100'>
                                        <Link
                                            className='flex items-center justify-center'
                                            to='/doctor/setting'
                                            state={doctorInfo}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#490B3D"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" /></svg>
                                            <p className='ml-1 text-base font-medium text-[#490B3D]'>Account Settings</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='w-full'>
                                <hr className="border-[1px] border-gray-200" />
                            </div>
                            <div>
                                <ul className='px-[1px]'>
                                    <li className='px-4 py-[1px] flex w-full rounded-lg hover:bg-[#f5bdcf] duration-100'>
                                        <button
                                            onClick={logout}
                                            className='flex items-center justify-center'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#490B3D"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                                            <p className='ml-1 text-base font-medium text-[#490B3D]'>Logout</p>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    )
                }



            </div>

            {/* Horizontal Navigation bar for sm and md screen */}

            <nav className="bg-white shadow-lg lg:hidden">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-7">
                            <Link to="/" className="flex items-center py-4 px-2">
                                <span className="font-semibold text-gray-500 text-lg">LOGO</span>
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-1 text-[#490B3D]">
                            <Link to="/" className="py-4 px-2">
                                Home
                            </Link>
                            <Link to="/appointments" className="py-4 px-2">
                                Appointments
                            </Link>
                            <Link to="/availability" className="py-4 px-2">
                                Availability
                            </Link>
                            <Link to="/leaves" className="py-4 px-2">
                                Leaves
                            </Link>
                            <Link to="/settings" className="py-4 px-2">
                                Setting
                            </Link>
                            <Link to="/edit-profile" className="py-4 px-2">
                                Edit Profile
                            </Link>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button
                                className="outline-none mobile-menu-button" onClick={() => (setMenuOpen(!menuOpen))}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#490B3D"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
                            </button>
                        </div>
                        <div className="hidden md:block relative flex items-center ">
                            <img
                                src={doctorInfo.profilePicture}
                                alt="Profile"
                                className="w-10 h-10 rounded-full border cursor-pointer"
                                onClick={() => setShowLogoutMenu(!showLogoutMenu)}

                            />
                            {showLogoutMenu && (
                                <button
                                    onClick={logout}
                                    className="absolute mt-2 right-0 flex items-center justify-center bg-white border border-gray-200 shadow-lg py-2 px-4 text-[#490B3D] text-sm rounded-lg z-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#490B3D"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                                    <p className='ml-1'>Logout</p>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`md:hidden absolute bg-white w-full z-10 flex flex-col items-center border-b opacity-85 text-sm text-[#490B3D] font-medium ${menuOpen ? 'block' : 'hidden'}`}>
                    <Link to="/" className="block py-2 px-">
                        Home
                    </Link>
                    <Link to="/settings" className="block py-2 px-4">
                        Appointments
                    </Link>
                    <Link to="/about" className="block py-2 px-4">
                        Availability
                    </Link>
                    <Link to="/about" className="block py-2 px-4 ">
                        Leaves
                    </Link>
                    <Link to="/about" className="block py-2 px-4">
                        Setting
                    </Link>
                    <Link to="/about" className="block py-2 px-4">
                        Edit Profile
                    </Link>
                    <Link to="/about" className="block py-2 px-4">
                        Logout
                    </Link>
                </div>
            </nav>
        </div>




    )
}

export default Doctor_Header
