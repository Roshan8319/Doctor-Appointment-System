import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MedPointLogo from '../../assets/MedPointLogo.svg';
import Badge from '@mui/material/Badge';
import CartForBuyMedicine from './CartForBuyMedicine';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

function Header() {
  const [isMenuButtonOpen, setMenuButtonOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleMenu = () => setMenuButtonOpen(!isMenuButtonOpen);
  const toggleCart = () => setCartOpen(!isCartOpen);

  const location = useLocation();
  const cart = useSelector((state) => state.cart.cart);



  return (
    <div>
      <header className='w-full bg-white px-4 lg:px-8 py-2 border-b flex items-center justify-between text-[#490B3D] text-base font-medium shadow-lg'>
        {/* Logo */}
        <div>
          <Link to="/">
            <img
              className='w-16 h-16 transform transition-transform duration-300 hover:scale-110'
              src={MedPointLogo}
              alt="MedPointLogo"
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className={`hidden lg:flex w-full items-center justify-center`}>
          <ul className='flex gap-x-6'>
            <li className='hover:text-[#BD1E51]'><Link to="">Home</Link></li>
            <li className='hover:text-[#BD1E51]'><Link to="/book-appointment">Book Appointment</Link></li>
            <li className='hover:text-[#BD1E51]'><Link to="/lab-test">Lab Test</Link></li>
            <li className='hover:text-[#BD1E51]'><Link to="/buy-medicine">Buy Medicine</Link></li>
            <li className='hover:text-[#BD1E51]'><Link to="/video-consult">Video Consult</Link></li>
          </ul>
        </nav>

        {/* Add to Cart Button Appears if the route is /buy-medicine */}

        <div className={`${isCartOpen ? 'bg-gray-100 border' : ''} mr-3 relative px-8 pt-2 flex items-center justify-center gap-x-8 w-[34px] h-[34px]  rounded-t-lg`}>
          {(location.pathname === '/buy-medicine' || '/buy-medicine/details') && (
            <Badge badgeContent={cart.length} color="error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#490B3D"
                onClick={toggleCart}
                className="cursor-pointer"
              >
                <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
              </svg>
            </Badge>
          )}
          {/* Cart item display */}
          {isCartOpen && (<CartForBuyMedicine />)}

        </div>

        {/* Menu Button for Mobile */}
        <button
          className='lg:hidden flex items-center text-[#490B3D]'
          onClick={toggleMenu}
        >
          {isMenuButtonOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#490B3D"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#490B3D"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          )}
        </button>

        {/* Login/Signup Button */}
        <div className='hidden lg:flex'>
          <ul className='flex gap-x-10'>
            <li>
              <Link
                className='border p-3 text-white rounded-lg bg-[#BD1E51] hover:bg-[#dd225d] duration-200 overflow-hidden'
                to="/user/login"
              >
                Login/Signup
              </Link>
            </li>
          </ul>
        </div>

        <div className='hidden lg:flex'>
          <ul className='flex gap-x-10'>
            <li>
              <button
                className='p-3 flex gap-2 border  rounded-lg items-center justify-center'
              >
                <div className='w-10 h-10 border border-red-600 overflow-hidden rounded-full'>
                <img className='w-full h-full'  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" alt="User Profile Picture" />
                </div>
                <h1>Sumit</h1>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-360 280-560h400L480-360Z"/></svg>
              </button>
            </li>
          </ul>
        </div>



      </header>

      {/* Mobile Navigation Links */}
      <div
        className={`${isMenuButtonOpen ? 'block' : 'hidden'} border fixed -top-58 left-0 w-full bg-white text-[#490B3D] text-base font-medium flex flex-col items-center justify-center text-center transition-transform duration-300 ease-in-out mt-5`}
      >
        <nav>
          <ul className='flex flex-col gap-y-1'>
            <li className='hover:text-[#BD1E51]'><Link to="/home">Home</Link></li>
            <li className='hover:text-[#BD1E51]'><Link to="/book-appointment">Book Appointment</Link></li>
            <li className='hover:text-[#BD1E51]'><Link to="/lab-test">Lab Test</Link></li>
            <li className='hover:text-[#BD1E51]'><Link to="/buy-medicine">Buy Medicine</Link></li>
            <li className='hover:text-[#BD1E51]'><Link to="/video-consult">Video Consult</Link></li>
          </ul>
        </nav>

        <ul className='mt-5 w-5/6 text-center text-white border bg-[#BD1E51] rounded-full'>
          <li>
            <Link
              className=''
              to="/login"
            >
              Login/Signup
            </Link>
          </li>
        </ul>
      </div>


    </div>
  );
}

export default Header;
