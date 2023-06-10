import Department from '../models/Department.js'

export const addDepartment = async (req, res, next) => {
    try {
        const newDepartment = req.body;
        const savedDepartment = await Department.create(newDepartment)

        res.status(200).json(savedDepartment);
    } catch (error) {
        next(error)
    }
}

export const getDepartment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id)
        if (!department) {
            return res.staus(404).json('No department found');
        }

        res.status(200).json(department);
    } catch (error) {
        next(error)
    }
}

export const updateDepartment = async (req, res, next) => {
    try {
        const updatedDepartment = await Department.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedDepartment);
    } catch (error) {
        next(error)
    }
}

export const getDepartments = async (req, res, next) =>{
    try {
        const departements = await Department.find();
        res.status(200).json(departements)
    } catch (error) {
        next(error)
    }
}

export const deleteDepartment = async (req, res, next) =>{
    try {
        const { id } = req.params;
        const department = await Department.findByIdAndDelete(id)
        res.status(200).json('Department deleted successfully')
    } catch (error) {
        next(error)
    }
}