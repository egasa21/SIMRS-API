import Medicine from '../models/Medicine.js';

export const addMedicine = async (req, res, next) => {
    try {
        const newMedicine = req.body;
        const savedMedicine = await Medicine.create(newMedicine);

        res.status(200).json(savedMedicine);
    } catch (error) {
        next(error)
    }
}

export const getMedicine = async (req, res, next) => {
    try {
        const { id } = req.params;
        const medicine = await Medicine.findById(id)
        if (!medicine) {
            return res.status(404).json('No medicine found')
        }
        res.status(200).json(medicine);
    } catch (error) {
        next(error)
    }
}

export const updateMedicine = async (req, res, next) => {
    try {
        const updatedMedicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedMedicine)
    } catch (error) {
        next(error);
    }
}

export const getMedicines = async (req, res, next) => {
    try {
        const medicine = await Medicine.find();
        res.status(200).json(medicine)
    } catch (error) {
        next(error)
    }
}

export const deleteMedicine = async (req, res, next) => {
    try {
        const { id } = req.params;
        const medicine = await Medicine.findByIdAndDelete(id)

        res.status(200).json({ message: 'Medicine deleted succesfully' });
    } catch (error) {
        next(error)
    }
}