import React from 'react'
import { NavLink } from 'react-router-dom'

function HomeBanner() {
  return (
    <div className="mt-5 bg-gradient-to-r from-[#b11b93] via-[#BD1E51] to-[#F1B814] text-white py-20">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Health, Our Priority</h1>
          <p className="text-lg md:text-2xl mb-8">Buy medicine, book lab tests, consult doctors, and more—all in one place.</p>
          <div className="flex space-x-4">
            <NavLink href="/buy-medicine" className="bg-white text-[#BD1E51] px-6 py-1 rounded-lg text-lg font-medium hover:bg-gray-200">Buy Medicine</NavLink>
            <NavLink href="/consult-doctor" className="bg-white text-[#BD1E51] px-6 py-1 rounded-lg text-lg font-medium hover:bg-gray-200">Book a Lab Test</NavLink>
            <NavLink href="/buy-medicine" className="bg-white text-[#BD1E51] px-6 py-1 rounded-lg text-lg font-medium hover:bg-gray-200">Book an Appointment</NavLink>
            <NavLink href="/buy-medicine" className="bg-white text-[#BD1E51] px-6 py-1 rounded-lg text-lg font-medium hover:bg-gray-200">Consult Online</NavLink>
          </div>
        </div>
      </div>
  )
}

export default HomeBanner
