import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoute from './src/routes/authRoutes.js';
import doctorRoute from './src/routes/doctorRoutes.js'
import userRoute from './src/routes/userRoutes.js'
import medicineRoute from './src/routes/medicineRoute.js'
import departmentRoute from './src/routes/departmentRoutes.js'
import appointmentRoute from './src/routes/appointmentRoutes.js'
import imageRoute from './src/routes/imageRoute.js'


const app = express();
dotenv.config();


const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO);
        console.log('Connected to mongoDB!')
    } catch (error) {
        throw error
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected!')
});

// middleware
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))

app.use('/api/auth', authRoute);
app.use('/api/doctors', doctorRoute);
app.use('/api/users', userRoute);
app.use('/api/medicines', medicineRoute);
app.use('/api/departments', departmentRoute);
app.use('/api/appointments', appointmentRoute);
app.use('/api/images',imageRoute)

app.get('/', (req, res) => {
    res.json({ message: "Hello" })
})

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});


app.listen(process.env.PORT, () => {
    connect();
    console.log('Server Connected')
})