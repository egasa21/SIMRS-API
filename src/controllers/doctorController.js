import Departement from "../models/Department.js";
import Doctor from "../models/Doctor.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addDoctor = async (req, res, next) => {
    try {
        const { department } = req.body;
        const departement = await Departement.findById(department);

        if (!departement) {
            return res.status(404).json('Department not found');
        }

        const extension = req.file.originalname.split('.').pop();
        const imageName = `${req.file.filename}.${extension}`;
        const imagePath = path.join(__dirname, '..', 'uploads', imageName);
        fs.renameSync(req.file.path, imagePath);

        const newDoctor = new Doctor({
            ...req.body,
            imgUrl: imageName,
            department: department,
        });

        const savedDoctor = await newDoctor.save();
        res.status(200).json(savedDoctor);
    } catch (error) {
        next(error);
        console.log(error);
    }
};

export const getDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find().populate('department', 'name');
        const doctorsWithDepartmentNames = doctors.map((doctor) => ({
            ...doctor.toObject(),
            department: doctor.department.name,
        }));
        res.status(200).json(doctorsWithDepartmentNames);
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
        const { id } = req.params;
        const { department } = req.body;
        const departement = await Departement.findById(department);

        if (!departement) {
            return res.status(404).json('Department not found');
        }

        let updatedDoctor = { ...req.body };

        if (req.file) {
            const extension = req.file.originalname.split('.').pop();
            const imageName = `${req.file.filename}.${extension}`;
            const imagePath = path.join(__dirname, '..', 'uploads', imageName);
            fs.renameSync(req.file.path, imagePath);

            updatedDoctor = {
                ...updatedDoctor,
                imgUrl: imageName,
            };
        }

        const editedDoctor = await Doctor.findByIdAndUpdate(id, updatedDoctor, { new: true });

        if (!editedDoctor) {
            return res.status(404).json('Doctor not found');
        }

        res.status(200).json(editedDoctor);
    } catch (error) {
        next(error);
        console.log(error);
    }
};




export const deleteDoctor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findByIdAndDelete(id);

        const filepath = doctor.imgUrl;
        const absoluteFilePath = path.join(__dirname, '..', 'uploads', filepath);

        if (fs.existsSync(absoluteFilePath)) {
            fs.unlinkSync(absoluteFilePath);
        }

        res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
        next(error)
    }
}