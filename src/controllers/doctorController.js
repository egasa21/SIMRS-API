import Departement from "../models/Department.js";
import Doctor from "../models/Doctor.js";

export const addDoctor = async (req, res, next) => {
    try {
        const { departmentId } = req.body;
        const departement = await Departement.findById(departmentId);

        if (!departement) {
            return res.status(404).json('Department not found')
        }
        const newDoctor = new Doctor({
            ...req.body,
            imgUrl: req.file.path,
            department: departmentId
        });

        const savedDoctor = await newDoctor.save();
        res.status(200).json(savedDoctor);
    } catch (error) {
        next(error);
        console.log(error)
    }
}

export const getDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find().populate('department', 'name');
        res.status(200).json(doctors);
    } catch (error) {
        next(error)
    }
}

export const getDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findById(id)
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        res.status(200).json(doctor);
    } catch (error) {
        next(error)
    }
}

export const updateDoctor = async (req, res, next) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json({ message: 'Doctor updated successfully' })
    } catch (error) {
        next(error)
    }
}

export const deleteDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findByIdAndDelete(id);

        res.status(200).json({ message: "Docter deleted successfully" })
    } catch (error) {
        next(error)
    }
}