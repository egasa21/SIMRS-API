import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Department from "../models/Department.js";

// Create a new appointment
export const createAppointment = async (req, res, next) => {
  try {
    const { name, email, departmentId, doctorId, appointTime, phone } = req.body;

    // Check if the department exists
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    // Check if the doctor exists and belongs to the selected department
    const doctor = await Doctor.findOne({ _id: doctorId, department: departmentId });
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found in the selected department" });
    }

    const appointment = await Appointment.create({
      name,
      email,
      department: departmentId,
      doctor: doctorId,
      appointTime,
      phone,
    });

    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

// Get all appointments
export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find().populate("department doctor");
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

// Get a single appointment by ID
export const getAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id).populate("department doctor");

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

// Update an existing appointment
export const updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { departmentId, doctorId, ...updateData } = req.body;

    // Check if the department exists
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    // Check if the doctor exists and belongs to the selected department
    const doctor = await Doctor.findOne({ _id: doctorId, department: departmentId });
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found in the selected department" });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        ...updateData,
        department: departmentId,
        doctor: doctorId,
      },
      { new: true }
    );

    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};

// Delete an appointment
export const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
