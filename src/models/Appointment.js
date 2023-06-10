import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true,
        },
        appointTime: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Appointment = mongoose.model('Appointment', AppointmentSchema);
export default Appointment;
