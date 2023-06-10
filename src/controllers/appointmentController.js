import Appointment from '../models/Appointment.js';
import Departement from '../models/Department.js';
import Doctor from '../models/Doctor.js';

export const addAppointment = async (req, res, next) => {
    try {
        const { name, email, deparmentId, doctorId, appointmentTime, phone } = req.body;

        // find reference doctor and department
        const doctor = await Doctor.findById(doctorId);
        const department = await Departement.findById(deparmentId);

        if (!doctor || !department) {
            return res.status(404).json('Doctor or department not found');
        }

        const appointment = await Appointment.create({
            name,
            email,
            department: deparmentId,
            doctor: doctorId,
            appointmentTime,
            phone
        })

        res.status(200).json(appointment);
    } catch (error) {
        next(error)
    }
}

export const getAppointments = async (req, res, next) => {
    const appointments = await Appointment.find().populate()
}