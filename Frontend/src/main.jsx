import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {Provider} from 'react-redux'
import Layout from './Layout.jsx'
import { store } from './app/store.js'
import {


  User_Signin,
  User_Signup,

  //Doctor Imports

  Doctor_Signin,
  Doctor_Signup,
  Doctor_Availability,
  Doctor_Mark_Leave,
  Doctor_Setting,
  Doctor_Home,
  Doctor_Update_Profile,
  Doctor_Appointments,


  //Home
  Home,


  //Appointment
  Appointment,


  //Lab Test
  LabTest,




  //Buy Medicine
  BuyMedicine,
  ViewMedicineDetails,



  //Video Consult
  VideoConsult,




} from './Components'


const router = createBrowserRouter(
  createRoutesFromElements(

    <Route>
      <Route path='/doctor'>
        <Route path='home' element={<Doctor_Home />} />
        <Route path='availability' element={<Doctor_Availability />} />
        <Route path='mark-leave' element={<Doctor_Mark_Leave />} />
        <Route path='appointments' element={<Doctor_Appointments />} />
        <Route path='setting' element={<Doctor_Setting />} />
        <Route path='update-profile' element={<Doctor_Update_Profile />} />
      </Route>
      <Route path='/' element={<Layout />}>

        {/* User Route */}


        <Route path='user'>
          <Route path='login' element={<User_Signin />} />
          <Route path='register' element={<User_Signup />} />
        </Route>


        {/* Doctor Route */}
        <Route path='doctor'>
          <Route path='login' element={<Doctor_Signin />} />
          <Route path='register' element={<Doctor_Signup />} />
        </Route>


        {/* Home Page */}
        <Route path='' element={<Home />} />


        {/* Appointment Route */}
        <Route path='book-appointment' element={<Appointment />} />


        {/* Lab Test */}
        <Route path='lab-test' element={<LabTest />} />


        {/* Buy Medicine */}
        <Route path='buy-medicine'>
          <Route path='' element={<BuyMedicine />} />
          <Route path='details' element={<ViewMedicineDetails />} />
        </Route>



        {/* Video Consult */}
        <Route path='video-consult' element={<VideoConsult />} />

      </Route>
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
