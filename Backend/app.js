import express from 'express'
import cors from 'cors'
import { ApiError } from './src/utils/ApiError.js'
import cookieParser from 'cookie-parser'

const app=express()

// app.use((err, req, res, next) => {
//   console.error(err.stack); // Log the error stack trace

//   if (err instanceof ApiError) {
//     console.log('Handling ApiError:', err.message);
//     res.status(err.statusCode).json({
//       message: err.message,
//       success: err.success,
//       errors: err.errors,
//       // Optionally include the stack trace in the response
//       // stack: err.stack
//     });
//   } else {
//     console.log('Handling generic error');
//     res.status(500).json({
//       message: 'Internal Server Error',
//       success: false,
//       errors: [],
//       // Optionally include the stack trace in the response
//       // stack: err.stack
//     });
//   }
// });


const corsOptions = {
  origin: 'http://localhost:5173', // Update this to your frontend domain
  credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import doctorRouter from './src/routes/doctor.route.js'
import userRouter from './src/routes/user.routes.js'
import medicineRouter from './src/routes/medicine.route.js'

app.get('/', (req, res) => {
    res.send('<h1>Hello from Express</h1>');
  });
  
app.use('/api/v1/doctor',doctorRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/medicine',medicineRouter)


app.use((err, req, res, next) => {
  console.error('Error handling middleware triggered');
  console.error(err.stack); // Log the error stack trace

  if (err instanceof ApiError) {
    console.log('Handling ApiError:', err.message);
    res.status(err.statusCode).json({
      message: err.message,
      success: err.success,
      errors: err.errors,
      // Optionally include the stack trace in the response
      // stack: err.stack
    });
  } else {
    console.log('Handling generic error');
    res.status(500).json({
      message: 'Internal Server Error',
      success: false,
      errors: [],
      // Optionally include the stack trace in the response
      // stack: err.stack
    });
  }
});




export {app}