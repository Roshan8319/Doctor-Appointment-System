import React from 'react'
import HomeBanner from './HomeBanner'
import OurServices from './OurServices'

function Home() {
  return (
    <div>

      <HomeBanner />
      <OurServices />
      < div className="bg-gray-50 min-h-screen flex flex-col">


      {/* Latest Health Posts */}
      <section id="posts" className="bg-white p-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Latest Health Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg relative">
              <img
                src="https://via.placeholder.com/400x200"
                alt="Health Tip"
                className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-lg"
              />
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-4">Tip Title 1</h3>
                <p className="mb-4">Brief description of the health tip or post.</p>
                <a href="#post1" className="text-blue-600 hover:underline">Read More</a>
              </div>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg relative">
              <img
                src="https://via.placeholder.com/400x200"
                alt="Health Tip"
                className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-lg"
              />
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-4">Tip Title 2</h3>
                <p className="mb-4">Brief description of the health tip or post.</p>
                <a href="#post2" className="text-blue-600 hover:underline">Read More</a>
              </div>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg relative">
              <img
                src="https://via.placeholder.com/400x200"
                alt="Health Tip"
                className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-lg"
              />
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-4">Tip Title 3</h3>
                <p className="mb-4">Brief description of the health tip or post.</p>
                <a href="#post3" className="text-blue-600 hover:underline">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    </div>

  )
}

export default Home
